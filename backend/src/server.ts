import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { deleteFromCache, getFromCache, setToCache } from './memcache';

require('dotenv').config()

interface rawData {
    id: number;
    labelX: string;
    value: number;
    labelZ: string;
}

interface Legend {
    x: string;
    y: string;
    z: string;
}

const app = express();
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

const key= process.env.API_KEY
const url= process.env.API_URL

const legend: Legend = {
    x: "DateTime",
    y: "Temperature",
    z: "City"
}

app.get("/api/call", async (req: Request, res: Response) => {
    try {
        const cachedData = await getFromCache<{data: rawData[], legend: Legend}>("data1");
        if(cachedData) {
            console.log("sto prendendo dalla cache");
            res.json(cachedData);
            await deleteFromCache("data1"); // elimino dalla cache per testare il corretto funzionamento di memcache
            return;
        }

        console.log("sto facendo la request");

        const promises = cities.map(item => axios.get(url + "?access_key="+key+"&query="+item.name));
        const results = await Promise.all(promises);
        let data: rawData[] = [];
        
        results.forEach((r, index) => {
            const hour: string = r.data.location.localtime;
            const value: number = r.data.current.temperature;
            const entry: rawData = { id: index , labelX: r.data.location.name, value: value, labelZ: hour };
            data.push(entry);
        });
        const d = {data: data, legend: legend}
        await setToCache("data1",d)
        res.json(d);
    }
    catch (error) {
        res.status(500).json({ error: "Errore nel recupero dei dati" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
