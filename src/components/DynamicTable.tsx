import { useMemo } from "react";
import { tabData } from "../App";

type DynamicTableProps = {
    filteredData: tabData[];
    allData: tabData[];
    xLabels: string[];
    zLabels: string[];
};

function DynamicTable({ filteredData, allData, xLabels, zLabels }: DynamicTableProps) {
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
  // creazione della struttura della tabella, per evidenziare le celle, vengono filtrate e se fanno parte dei valori da mostrare, vengono colorate di verde
    return (
      <table border={1} style={{ borderCollapse: "collapse", width: "20em", float: "left", margin: "4%" }}>
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
                return (
                  <td key={i} style={{ backgroundColor: isHighlighted ? "lightgreen" : "lightgray" }}>
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