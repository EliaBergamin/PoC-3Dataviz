import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import Redis from "ioredis";

interface rawData {
    id: number;
    labelX: string;
    value: number;
    labelZ: string;
}

const app = express();
const redis = new Redis(); // Connessione locale su 127.0.0.1:6379
const CACHE_EXPIRATION = 3600; // Cache di 1 ora
app.use(cors());
app.use(express.json());

const cities = [
    {
        id: 0,
        name: 'Berlin',
        latitude: 52.548,
        longitude: 13.41
    },
    {
        id: 1,
        name: 'Paris',
        latitude: 48.54,
        longitude: 2.27
    },
    {
        id: 2,
        name: 'Rome',
        latitude: 41.93,
        longitude: 12.56
    },
    {
        id: 3,
        name: 'Madrid',
        latitude: 40.39,
        longitude: -3.68
    }
];
const latitudes = cities.map(city => city.latitude).join(",");
const longitudes = cities.map(city => city.longitude).join(",");
const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitudes}&longitude=${longitudes}&start_date=2024-01-01&end_date=2024-01-11&hourly=temperature_2m`;
const legend = {
    x: "DateTime",
    y: "Temperature",
    z: "City"
}

app.get("/api/meteo1", async (req: Request, res: Response) => {
    const cacheKey = "meteo1";
    try {
        const cachedData = await redis.get("meteo1");
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            console.log("Dati recuperati dalla cache");
            return;
        }
        const response = await axios.get(URL);
        console.log("Dati recuperati da Open-Meteo");
        let data: rawData[] = [];
        for (let i = 0; i < cities.length; i++) {
            const hours: string[] = response.data[i].hourly.time;
            const values: number[] = response.data[i].hourly.temperature_2m;
            for (let j = 0; j < hours.length; j++) {
                const entry: rawData = { id: j * cities.length + i, labelX: hours[j].replace('T', ' '), value: values[j], labelZ: cities[i].name };
                data.push(entry);
            }
        }
        const result = { data: data, legend: legend };
        await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(result));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Errore nel recupero dei dati" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
