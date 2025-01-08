import { useMemo } from "react";
import { tabData } from "../App";

type DynamicTableProps = {
  filteredData: tabData[];
  allData: tabData[];
  xLabels: string[];
  zLabels: string[];
  setFilteredData: (value: React.SetStateAction<tabData[]>) => void;
  setSelectedBar: (value: React.SetStateAction<tabData | null>) => void;
  isGreaterChecked: boolean;
};

function DynamicTable({ filteredData, allData, xLabels, zLabels, setFilteredData, setSelectedBar, isGreaterChecked }: DynamicTableProps) {
  const tableData = useMemo(() => { //usememo viene utilizzata per calcolare tabledata, array bidimensionale che rappresenta i valori della tabella, eseguito solo quando alldata cambia
    const result: number[][] = [];
    const nLabel = xLabels.length;
    for (let i = 0; i < nLabel; i++) {
      result.push([]);
      allData
        .filter((d) => d.labelX === i) //ogni label corrisponde a una riga della tabella
        .sort((a, b) => a.labelZ - b.labelZ) //i valori sono ordinati e aggiunti alla riga corrispondente
        .forEach((d) => result[i].push(d.value));
    }
    return result;
  }, [allData]);

  const handleCellClick = (id: string) => {
    const clickedBar: tabData | undefined = allData.find((bar) => bar.id.toString() === id);

    if (clickedBar) {
      setSelectedBar(clickedBar); // Imposta la barra selezionata
      if (isGreaterChecked)
        setFilteredData(allData.filter((d) => d.value >= clickedBar.value)); // Filtra i dati
      else
        setFilteredData(allData.filter((d) => d.value <= clickedBar.value)); // Filtra i dati
    }
  }

  // creazione della struttura della tabella, per evidenziare le celle, vengono filtrate e se fanno parte dei valori da mostrare, vengono colorate di verde
  return (
    <table id="table" >
      <thead>
        <tr>
          <td></td>
          {zLabels.map((zLabel) => (
            <th key={zLabel}>{zLabel}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <th>{xLabels[index]}</th>
            {row.map((value, i) => {
              const isHighlighted = filteredData.some(
                (d) => d.labelX === index && d.labelZ === i && d.value === value
              );
              const id = index * row.length + i + 1;
              return (
                <td key={id} onClick={() => handleCellClick(id.toString())} style={{ backgroundColor: isHighlighted ? "lightgreen" : "lightgray" }}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;