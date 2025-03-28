import { useState } from "react";
import "./App.css";
import CustomCanvas from "./components/CustomCanvas.tsx";
import DynamicTable from "./components/DynamicTable.tsx";
import Filters from "./components/Filters.tsx";
import Footer from "./components/Footer.tsx";
import { DataContext } from "./components/context.ts";
import { useData } from "./components/DataProvider.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Api from "./pages/Api.tsx";
import NotFound from "./pages/NotFound.tsx";

export interface Entry {
  id: number;
  x: string;
  y: number;
  z: string;
}

export interface tabData {
  id: number;
  x: number;
  y: number;
  z: number;
}

function App() {
  /* const { fetched, loading, error } = useData();

  if (loading) return <p>Caricamento...</p>;
  if (error || !fetched) return <p>Errore: {error}</p>;
  const data: Entry[] = fetched.data;
  let xLabels = Array.from(new Set(data.map((d) => d.x)));
  let zLabels = Array.from(new Set(data.map((d) => d.z)));
  const processed_data: tabData[] = data.map((d) => ({
    ...d,
    x: Array.from(xLabels).indexOf(d.x),
    z: Array.from(zLabels).indexOf(d.z),
  }));

  console.log(processed_data);
 */
  /* const [filteredData, setFilteredData] = useState(processed_data);
  const [selectedBar, setSelectedBar] = useState<tabData | null>(null);
  const [isGreaterChecked, setIsGreaterChecked] = useState(true); // Checkbox sopra una barra

  const [showAveragePlane, setShowAveragePlane] = useState(true); // Stato per la visibilità del piano medio

  // Funzione per toggle del piano medio
  const toggleAveragePlane = () => {
    setShowAveragePlane((prev) => !prev);
  };
  const resetFilters = () => {
    setFilteredData(processed_data); // Ripristina i dati originali
    setSelectedBar(null); // Deseleziona la barra */
  /* setShowAveragePlane(true); */ // Mostra il piano medio
  /* };

  const handleCellClick = (id: string) => {
    const clickedBar: tabData | undefined = processed_data.find(
      (bar) => bar.id.toString() === id,
    );
    console.log(clickedBar);
    if (clickedBar) {
      setSelectedBar(clickedBar); // Imposta la barra selezionata
      if (isGreaterChecked)
        setFilteredData(
          processed_data.filter((d) => d.y >= clickedBar.y),
        ); // Filtra i dati
      else
        setFilteredData(
          processed_data.filter((d) => d.y <= clickedBar.y),
        ); // Filtra i dati
    }
  }; */

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/:id" element={<Api />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
