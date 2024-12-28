import { useState, /* useRef */ } from "react";
import Bar from "./Bar";

export interface tabData {
  id: number;
  label: number;
  value: number;
  color: number;
}

function BarChart() {

  const data: tabData[] = [
    { id: 1, label: 1, value: 4, color: 0 },
    { id: 2, label: 1, value: 5, color: 1 },
    { id: 3, label: 1, value: 2, color: 2 },
    { id: 4, label: 2, value: 8, color: 0 },
    { id: 5, label: 2, value: 8, color: 1 },
    { id: 6, label: 2, value: 15, color: 2 },
    { id: 7, label: 4, value: 3, color: 0 },
  ];
  const [selectedBar, setSelectedBar] = useState<tabData | null>(null);

  const handleBarClick = (id: string) => {
    const clickedBar: tabData | undefined = data.find((bar) => bar.id.toString() === id);
    console.log(clickedBar);

    setSelectedBar(clickedBar ? clickedBar : null); // Salva la barra selezionata
  }

  /* const hoverTimeout = useRef<number | null>(null);

  const handleHover = (e: ThreeEvent<PointerEvent>, height: number) => {
    clearTimeout(hoverTimeout.current); // Rimuove il timeout precedente

    if (height) {
      hoverTimeout.current = setTimeout(() => {
        const { x, y, z } = e.point;
        setHoveredHeight(height);
        setTooltipPosition([x + 0.3, y + 0.3, z]);
      }, 40); // Ritarda l'aggiornamento
    } else {
      hoverTimeout.current = setTimeout(() => {
        setHoveredHeight(null); // Nasconde il tooltip
      }, 40);
    }
  }; */
  return (
    <>
    {
      data.map((d: tabData) => (
        <Bar
          row={d}

          isTransparent={
            selectedBar ? d.value < selectedBar.value : false // Trasparente se altezza minore della barra selezionata
          }
          onClick={handleBarClick}
          /* onHover={handleHover} */
        />
      ))
    }
    </>
  );
}

export default BarChart;