import axios from "axios";
import { rawData } from "./App";

// Funzione per ottenere i dati
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
export const fetchData = async (): Promise<rawData[]> => {
  const response = await axios.get(URL);
  let data: rawData[] = [];
  for (let i = 0; i < cities.length; i++) {
    const hours = response.data[i].hourly.time;
    const values = response.data[i].hourly.temperature_2m;
    const size = hours.length;
    for (let j = 0; j < size; j++) {
      const entry: rawData = { id: i * size + j, labelX: hours[j], value: values[j], labelZ: cities[i].name };
      data.push(entry);
    }
  }
  console.log(data);
  return data;
};
