import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { tabData } from "../App";

type DynamicTableProps = {
  onCellClick: (id: string) => void;
};

function DynamicTable({ onCellClick }: DynamicTableProps) {
  const { data, filteredData } = useSelector(
    (state: RootState) => state.dataset
  );
  if (!data) return null;
  console.log(data);
  console.log(data[0].x, data[0].y, data[0].z);
  const xLabels = Array.from(new Set(data.map((d) => d.x)));
  const zLabels = Array.from(new Set(data.map((d) => d.z)));
  const processedData: tabData[] = data.map((d) => ({
    ...d,
    x: Array.from(xLabels).indexOf(d.x),
    value: d.y,
    z: Array.from(zLabels).indexOf(d.z)
  }));
  if (!filteredData) return null;
  console.log(data[0].y);
  console.log(processedData[0].y);
  console.log(filteredData[0].y);
  const processedfilteredData: tabData[] = filteredData.map((d) => ({
    ...d,
    x: Array.from(xLabels).indexOf(d.x),
    value: d.y,
    z: Array.from(zLabels).indexOf(d.z)
  }));
  console.log(processedfilteredData[0].y);
  //console.log(xLabels, zLabels);
  const tableData = useMemo(() => {
    //usememo viene utilizzata per calcolare tabledata, 
    // array bidimensionale che rappresenta i valori della 
    // tabella, eseguito solo quando data cambia
    const result: number[][] = [];
    const nLabel = xLabels.length;
    for (let i = 0; i < nLabel; i++) {
      result.push([]);
      processedData
        .filter((d) => d.x === i) //ogni label corrisponde a una riga della tabella
        .sort((a, b) => a.z - b.z) //i valori sono ordinati e aggiunti alla riga corrispondente
        .forEach((d) => result[i].push(d.y));
    }
    return result;
  }, [data]);
  // creazione della struttura della tabella, per evidenziare le celle, 
  // vengono filtrate e se fanno parte dei valori da mostrare, vengono 
  // colorate di verde
  return (
    <table id="table">
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
              const isHighlighted = processedfilteredData.some(
                (d) => d.x === index && d.z === i && d.y === value
              );
              const id = index * row.length + i;
              //console.log(value);
              return (
                <td
                  key={id}
                  id={id.toString()}
                  onClick={() => onCellClick(id.toString())}
                  style={{
                    backgroundColor: isHighlighted ? "lightgreen" : "lightgray"
                  }}
                >
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
