import express from "express";
import cors from "cors";
import axios from "axios";

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
const latitudes = cities.map(city => city.latitude).join(",");
const longitudes = cities.map(city => city.longitude).join(",");
const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitudes}&longitude=${longitudes}&start_date=2025-01-01&end_date=2025-01-05&hourly=temperature_2m`;

app.get("/api/meteo1", async (req, res) => {
  try {
    const response = await axios.get(URL);
    let data = [];
    for (let i = 0; i < cities.length; i++) {
      const hours = response.data[i].hourly.time;
      const values = response.data[i].hourly.temperature_2m;
      const size = hours.length;
      for (let j = 0; j < size; j++) {
        const entry = { id: i * size + j, labelX: hours[j], value: values[j], labelZ: cities[i].name };
        data.push(entry);
      }
    }
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
