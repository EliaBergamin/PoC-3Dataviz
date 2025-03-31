import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Entry, tabData } from "../App";

type DynamicTableProps = {
  onCellClick: (id: string) => void;
};

function DynamicTable({ onCellClick }: DynamicTableProps) {
  const { data, filteredData } = useSelector(
    (state: RootState) => state.dataset
  );
  const xLabels = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((d) => d.x)));
  }, [data]);

  const zLabels = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((d) => d.z)));
  }, [data]);

  const processData = useCallback(
    (dataset: Entry[] | null): tabData[] => {
      if (!dataset) return [];

      return dataset.map((d) => ({
        ...d,
        x: xLabels.indexOf(d.x),
        value: d.y,
        z: zLabels.indexOf(d.z),
      }));
    },
    [xLabels, zLabels] // Dipende dalle etichette
  );

  const processedData = useMemo(() => processData(data), [processData, data]);
  const processedfilteredData = useMemo(() => processData(filteredData), [processData, filteredData]);

  const tableData = useMemo(() => {
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

  // ✅ Ora il return non interrompe l'esecuzione degli hook
  if (!data || !tableData) return <p>Loading...</p>;
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
