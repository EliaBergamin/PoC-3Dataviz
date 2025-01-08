import { useState, useRef, useEffect } from "react";
import Bar from "./Bar";
import XAxis from "./XAxis";
import ZAxis from "./ZAxis";
import { ThreeEvent } from "@react-three/fiber";
import YAxis from "./YAxis";
import { rawData } from "../App";
import Tooltip from "./Tooltip";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { tabData } from "../App";

type BarChartProps = {
  fetched_data: rawData[];
  filteredData: tabData[];
  allData: tabData[];
  showAveragePlane: boolean;
  resetFilters: () => void;
  setFilteredData: (value: React.SetStateAction<tabData[]>) => void;
  setSelectedBar: (value: React.SetStateAction<tabData | null>) => void;
  isGreaterChecked: boolean;
};

function BarChart({ fetched_data, filteredData, allData, showAveragePlane, resetFilters, setFilteredData, setSelectedBar, isGreaterChecked }: BarChartProps) {

  let xLabels = new Set(fetched_data.map((d) => d.labelX));
  let yValues = new Set(fetched_data.map((d) => d.value));
  let zLabels = new Set(fetched_data.map((d) => d.labelZ));
  const data: tabData[] = fetched_data.map((d) => ({
    ...d,
    labelX: Array.from(xLabels).indexOf(d.labelX),
    labelZ: Array.from(zLabels).indexOf(d.labelZ)
  }));

  const handleBarClick = (id: string, event: ThreeEvent<MouseEvent>) => {
    const clickedBar: tabData | undefined = data.find((bar) => bar.id.toString() === id);
    
    const intersections = event.intersections;

    if (intersections[0]?.object === event.object) {
      if (clickedBar) {
        setSelectedBar(clickedBar); // Imposta la barra selezionata
        if (isGreaterChecked)
          setFilteredData(data.filter((d) => d.value >= clickedBar.value)); // Filtra i dati
        else 
          setFilteredData(data.filter((d) => d.value <= clickedBar.value)); // Filtra i dati
      }
    }
  }

  const [hoveredBar, setHoveredBar] = useState<rawData | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const { camera, scene } = useThree();
  const handleMouseMove = (event: MouseEvent) => {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      // Calcola le coordinate del mouse normalizzate (-1 a 1)
      const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Lancia il raggio
      raycaster.current.setFromCamera(mouse.current, camera);

      // Trova le intersezioni con le barre
      const intersects = raycaster.current.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const firstObject = intersects[0].object; // L'oggetto più vicino
        const intersectedBar = fetched_data.find((bar) => bar.id === firstObject.userData.id);

        if (intersectedBar) {
          setHoveredBar(intersectedBar ? intersectedBar : null); // Mostra il tooltip
          setTooltipPosition(intersects[0].point.add(new THREE.Vector3(0.5, -0.5, 0)));
        }
      } else {
        setHoveredBar(null); // Nessuna barra sotto il mouse
      }
    }, 40);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera, scene, data]);

  /* 
    const handleHover = (e: ThreeEvent<PointerEvent>, bar: rawData | null) => {
      if (hoverTimeout.current !== null) {
        clearTimeout(hoverTimeout.current);
      }
      if (bar) {
        hoverTimeout.current = setTimeout(() => {
          const { x, y, z } = e.point;
  
          const intersections = e.intersections;
          if (intersections[0]?.object === e.object) {
            setHoveredBar(bar ? bar : null); // Mostra il tooltip
  
            setTooltipPosition(new THREE.Vector3(x + 0.3, y + 0.3, z + 0.3));
          }
        }, 40); // Ritarda l'aggiornamento
      } else {
        hoverTimeout.current = setTimeout(() => {
          setHoveredBar(null); // Nasconde il tooltip
        }, 40);
      }
    }; */
  const nLabel = xLabels.size;
  const xAxisLength = 6 * nLabel ;
  const zAxisLength = 6 * zLabels.size ;

  return (
    <>
      {
        data.map((d: tabData) => {
          const isFiltered = filteredData.some((f) => f.labelX === d.labelX && f.labelZ === d.labelZ && f.value === d.value);
          return (
            <Bar
              key={d.id}
              row={d}
              xLabels={xLabels}
              zLabels={zLabels}
              isFiltered={isFiltered}
              userData={{ id: d.id }}
              onClick={handleBarClick}
/*             onHover={handleHover}
 */          />
          );
        })};
      <XAxis xLabels={Array.from(xLabels)} />
      <YAxis yValues={Array.from(yValues)} xAxisLength={xAxisLength} />
      <ZAxis zLabels={Array.from(zLabels)} />
      {hoveredBar && <Tooltip position={tooltipPosition} bar={hoveredBar} />}
      {/* Piano medio, visibile solo se showAveragePlane è true */}
      {showAveragePlane && (
        <mesh
          position={[xAxisLength/2, data.map((d) => d.value).reduce((acc, curr) => acc + curr, 0) / data.length, zAxisLength/2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[xAxisLength, zAxisLength]} />
          <meshStandardMaterial color="lightgray" transparent={true} opacity={0.4} depthWrite={false} />
        </mesh>
      )}
    </>
  );
}

export default BarChart;