import { useMemo, useState } from 'react';
import { tabData } from '../App';

type FiltersProps = {
    data: tabData[];
    setFilteredData: (value: React.SetStateAction<tabData[]>) => void;
}

// Funzione per il filtro Top N
const filterTopN = (data: tabData[], n: number) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    return sortedData.slice(0, n);
  };
  
  // Funzione per il filtro Bottom N
  const filterBottomN = (data: tabData[], n: number) => {
    const sortedData = [...data].sort((a, b) => a.value - b.value);
    return sortedData.slice(0, n);
  };
  
  // Funzione per il filtro sopra la media
  const filterAboveAverage = (data: tabData[], average: number) => {
    return data.filter((d) => d.value > average);
  };
  
  // Funzione per il filtro sotto la media
  const filterBelowAverage = (data: tabData[], average: number) => {
    return data.filter((d) => d.value < average);
  };

function Filters({ data, setFilteredData }: FiltersProps) {
    const [nValue, setNValue] = useState(""); // Valore di N per il filtro top/bottom
    const [isTopChecked, setIsTopChecked] = useState(false); // Checkbox top
    const [isBottomChecked, setIsBottomChecked] = useState(false); // Checkbox bottom
    const [isUpperChecked, setIsUpperChecked] = useState(false); // Checkbox sopra la media
    const [isLowerChecked, setIsLowerChecked] = useState(false); // Checkbox sotto la media
  
    const globalAverage = useMemo(() => {
      return data.length > 0 ? data.map((d) => d.value).reduce((acc, curr) => acc + curr, 0) / data.length : 0;
    }, []);
  
    const handleTopBottomFilter = () => {
      let filteredData = [...data];
      if (isTopChecked) filteredData = filterTopN(filteredData, parseInt(nValue));
      if (isBottomChecked) filteredData = filterBottomN(filteredData, parseInt(nValue));
      setFilteredData(filteredData);
    };
  
    const handleAverageFilter = () => {
      let filteredData = [...data];
      if (isUpperChecked) filteredData = filterAboveAverage(filteredData, globalAverage);
      if (isLowerChecked) filteredData = filterBelowAverage(filteredData, globalAverage);
      setFilteredData(filteredData);
    };
  
    return (
  <div id="container">
    <div id="filter1">
    Filtra top o bottom n barre del grafico
    <div className="filter-body">
      <label htmlFor="number-selector">Inserisci N:</label>
      <input
        type="number"
        id="number-selector"
        min="1"
        placeholder="Inserisci un numero"
        value={nValue}
        onChange={(e) => setNValue(e.target.value)}
      />
      <div>
        <input
          type="radio"
          id="top-radio"
          name="topBottom"
          checked={isTopChecked}
          onChange={() => {
            setIsTopChecked(true);
            setIsBottomChecked(false); // Deseleziona l'altro
          }}
        />
        <label htmlFor="top-radio">Top</label>
      </div>
      <div>
        <input
          type="radio"
          id="bottom-radio"
          name="topBottom"
          checked={isBottomChecked}
          onChange={() => {
            setIsBottomChecked(true);
            setIsTopChecked(false); // Deseleziona l'altro
          }}
        />
        <label htmlFor="bottom-radio">Bottom</label>
      </div>
      <button onClick={handleTopBottomFilter}>Filtra</button>
    </div>
  </div>
  
  <div id="filter2">
    Filtra in base al valore medio globale
    <div className="filter-body">
      Valore medio globale: <strong>{globalAverage.toFixed(2)}</strong>
      <div>
        <input
          type="radio"
          id="upper-radio"
          name="averageFilter"
          checked={isUpperChecked}
          onChange={() => {
            setIsUpperChecked(true);
            setIsLowerChecked(false); // Deseleziona l'altro
          }}
        />
        <label htmlFor="upper-radio">Upper</label>
      </div>
      <div>
        <input
          type="radio"
          id="lower-radio"
          name="averageFilter"
          checked={isLowerChecked}
          onChange={() => {
            setIsLowerChecked(true);
            setIsUpperChecked(false); // Deseleziona l'altro
          }}
        />
        <label htmlFor="lower-radio">Lower</label>
      </div>
      <button onClick={handleAverageFilter}>Filtra</button>
    </div>
  </div>
  </div>
    );
  }

  export default Filters;