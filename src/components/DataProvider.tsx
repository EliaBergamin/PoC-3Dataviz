import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { rawData } from "../App";

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
const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitudes}&longitude=${longitudes}&start_date=2025-01-01&end_date=2025-01-31&hourly=temperature_2m`;

// Definisci il tipo del contesto
interface DataContextType {
  data: rawData[] | null;
  loading: boolean;
  error: string | null;
}

// Crea il contesto con un valore iniziale
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<rawData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setData(data);
      } catch (err) {
        setError("Errore nel recupero dei dati");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom Hook per usare il contesto più facilmente
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve essere usato dentro un DataProvider");
  }
  return context;
};