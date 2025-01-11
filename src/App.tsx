import { useState } from 'react'
import './App.css'
import CustomCanvas from './components/CustomCanvas.tsx';
import DynamicTable from './components/DynamicTable.tsx';
import Filters from './components/Filters.tsx';
import Footer from './components/Footer.tsx';
import { DataContext } from './components/context.ts';

export interface rawData {
  id: number;
  labelX: string;
  value: number;
  labelZ: string;
}

export interface tabData {
  id: number;
  labelX: number;
  value: number;
  labelZ: number;
}

function App() {
  const fetched_data: rawData[] = [
    { id: 1, labelX: 'Mele', value: 4, labelZ: 'Vicenza' },
    { id: 2, labelX: 'Mele', value: 5, labelZ: 'Padova' },
    { id: 3, labelX: 'Mele', value: 2, labelZ: 'Venezia' },
    { id: 4, labelX: 'Mele', value: 8, labelZ: 'Verona' },
    { id: 5, labelX: 'Pere', value: 8, labelZ: 'Vicenza' },
    { id: 6, labelX: 'Pere', value: 15, labelZ: 'Padova' },
    { id: 7, labelX: 'Pere', value: 3, labelZ: 'Venezia' },
    { id: 8, labelX: 'Pere', value: 6, labelZ: 'Verona' },
    { id: 9, labelX: 'Banane', value: 10, labelZ: 'Vicenza' },
    { id: 10, labelX: 'Banane', value: 7, labelZ: 'Padova' },
    { id: 11, labelX: 'Banane', value: 9, labelZ: 'Venezia' },
    { id: 12, labelX: 'Banane', value: 12, labelZ: 'Verona' },
    { id: 13, labelX: 'Kiwi', value: 4, labelZ: 'Vicenza' },
    { id: 14, labelX: 'Kiwi', value: 8, labelZ: 'Padova' },
    { id: 15, labelX: 'Kiwi', value: 6, labelZ: 'Venezia' },
    { id: 16, labelX: 'Kiwi', value: 5, labelZ: 'Verona' },
    { id: 17, labelX: 'Arance', value: 7, labelZ: 'Vicenza' },
    { id: 18, labelX: 'Arance', value: 5, labelZ: 'Padova' },
    { id: 19, labelX: 'Arance', value: 6, labelZ: 'Venezia' },
    { id: 20, labelX: 'Arance', value: 8, labelZ: 'Verona' },
    { id: 21, labelX: 'Fragole', value: 9, labelZ: 'Vicenza' },
    { id: 22, labelX: 'Fragole', value: 7, labelZ: 'Padova' },
    { id: 23, labelX: 'Fragole', value: 10, labelZ: 'Venezia' },
    { id: 24, labelX: 'Fragole', value: 12, labelZ: 'Verona' },
    { id: 25, labelX: 'Uva', value: 11, labelZ: 'Vicenza' },
    { id: 26, labelX: 'Uva', value: 13, labelZ: 'Padova' },
    { id: 27, labelX: 'Uva', value: 14, labelZ: 'Venezia' },
    { id: 28, labelX: 'Uva', value: 15, labelZ: 'Verona' },
    { id: 29, labelX: 'Mango', value: 10, labelZ: 'Vicenza' },
    { id: 30, labelX: 'Mango', value: 12, labelZ: 'Padova' },
    { id: 31, labelX: 'Mango', value: 14, labelZ: 'Venezia' },
    { id: 32, labelX: 'Mango', value: 16, labelZ: 'Verona' },
    { id: 33, labelX: 'Papaya', value: 11, labelZ: 'Vicenza' },
    { id: 34, labelX: 'Papaya', value: 13, labelZ: 'Padova' },
    { id: 35, labelX: 'Papaya', value: 15, labelZ: 'Venezia' },
    { id: 36, labelX: 'Papaya', value: 17, labelZ: 'Verona' },
    { id: 37, labelX: 'Ananas', value: 12, labelZ: 'Vicenza' },
    { id: 38, labelX: 'Ananas', value: 14, labelZ: 'Padova' },
    { id: 39, labelX: 'Ananas', value: 16, labelZ: 'Venezia' },
    { id: 40, labelX: 'Ananas', value: 18, labelZ: 'Verona' },
    { id: 41, labelX: 'Pesche', value: 13, labelZ: 'Vicenza' },
    { id: 42, labelX: 'Pesche', value: 15, labelZ: 'Padova' },
    { id: 43, labelX: 'Pesche', value: 17, labelZ: 'Venezia' },
    { id: 44, labelX: 'Pesche', value: 19, labelZ: 'Verona' },
    { id: 45, labelX: 'Prugne', value: 14, labelZ: 'Vicenza' },
    { id: 46, labelX: 'Prugne', value: 16, labelZ: 'Padova' },
    { id: 47, labelX: 'Prugne', value: 18, labelZ: 'Venezia' },
    { id: 48, labelX: 'Prugne', value: 20, labelZ: 'Verona' },
    { id: 49, labelX: 'Angurie', value: 15, labelZ: 'Vicenza' },
    { id: 50, labelX: 'Angurie', value: 17, labelZ: 'Padova' },
    { id: 51, labelX: 'Angurie', value: 19, labelZ: 'Venezia' },
    { id: 52, labelX: 'Angurie', value: 21, labelZ: 'Verona' },
    { id: 53, labelX: 'Ciliegie', value: 16, labelZ: 'Vicenza' },
    { id: 54, labelX: 'Ciliegie', value: 18, labelZ: 'Padova' },
    { id: 55, labelX: 'Ciliegie', value: 0, labelZ: 'Venezia' },
    { id: 56, labelX: 'Ciliegie', value: 22, labelZ: 'Verona' },
    { id: 57, labelX: 'Mirtilli', value: 17, labelZ: 'Vicenza' },
    { id: 58, labelX: 'Mirtilli', value: 9, labelZ: 'Padova' },
    { id: 59, labelX: 'Mirtilli', value: 21, labelZ: 'Venezia' },
    { id: 60, labelX: 'Mirtilli', value: 23, labelZ: 'Verona' },
    { id: 61, labelX: 'Lamponi', value: 8, labelZ: 'Vicenza' },
    { id: 62, labelX: 'Lamponi', value: 2, labelZ: 'Padova' },
    { id: 63, labelX: 'Lamponi', value: 22, labelZ: 'Venezia' },
    { id: 64, labelX: 'Lamponi', value: 4, labelZ: 'Verona' },
    { id: 65, labelX: 'More', value: 19, labelZ: 'Vicenza' },
    { id: 66, labelX: 'More', value: 11, labelZ: 'Padova' },
    { id: 67, labelX: 'More', value: 23, labelZ: 'Venezia' },
    { id: 68, labelX: 'More', value: 5, labelZ: 'Verona' }
  ];
  let xLabels = Array.from(new Set(fetched_data.map((d) => d.labelX)));
  let zLabels = Array.from(new Set(fetched_data.map((d) => d.labelZ)));
  const data: tabData[] = fetched_data.map((d) => ({
    ...d,
    labelX: Array.from(xLabels).indexOf(d.labelX),
    labelZ: Array.from(zLabels).indexOf(d.labelZ)
  }));

  const [filteredData, setFilteredData] = useState(data);
  const [selectedBar, setSelectedBar] = useState<tabData | null>(null);
  const [isGreaterChecked, setIsGreaterChecked] = useState(true); // Checkbox sopra una barra

  const [showAveragePlane, setShowAveragePlane] = useState(true); // Stato per la visibilità del piano medio

  // Funzione per toggle del piano medio
  const toggleAveragePlane = () => {
    setShowAveragePlane((prev) => !prev);
  };
  const resetFilters = () => {
    setFilteredData(data); // Ripristina i dati originali
    setSelectedBar(null); // Deseleziona la barra
    /* setShowAveragePlane(true); */ // Mostra il piano medio
  };

  const handleCellClick = (id: string) => {
    const clickedBar: tabData | undefined = data.find((bar) => bar.id.toString() === id);
    console.log(clickedBar);
    if (clickedBar) {
      setSelectedBar(clickedBar); // Imposta la barra selezionata
      if (isGreaterChecked)
        setFilteredData(data.filter((d) => d.value >= clickedBar.value)); // Filtra i dati
      else
        setFilteredData(data.filter((d) => d.value <= clickedBar.value)); // Filtra i dati
    }
  }

  return (
    <DataContext.Provider value={{ data, filteredData, setFilteredData, setSelectedBar, xLabels, zLabels, showAveragePlane, isGreaterChecked }}>
      <div id='controls'>
        <div id="title">
          <h1>3Dataviz PoC</h1>
        </div>
        <DynamicTable onCellClick={handleCellClick}/>
        <div id='buttons'>
          <button onClick={toggleAveragePlane}>
            {showAveragePlane ? "Nascondi piano medio" : "Mostra piano medio"}
          </button>
          <button id='reset' onClick={resetFilters}>Resetta filtri</button>
        </div>
        <div id='wrapper'>
        <CustomCanvas selectedBar={selectedBar}
        />
        <Filters
          selectedBar={selectedBar}
          setIsGreaterChecked={setIsGreaterChecked}
        />     
        </div>
        <Footer />
      </div>
      

      
    </DataContext.Provider>
  )
}

export default App
