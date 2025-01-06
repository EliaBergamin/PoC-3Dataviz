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

export interface tabData {
  id: number;
  labelX: number;
  value: number;
  labelZ: number;
}

type BarChartProps = {
  fetched_data: rawData[];
};

function BarChart({ fetched_data }: BarChartProps) {

  let xLabels = new Set(fetched_data.map((d) => d.labelX));
  let yValues = new Set(fetched_data.map((d) => d.value));
  let zLabels = new Set(fetched_data.map((d) => d.labelZ));
  const data: tabData[] = fetched_data.map((d) => ({
    ...d,
    labelX: Array.from(xLabels).indexOf(d.labelX),
    labelZ: Array.from(zLabels).indexOf(d.labelZ)
  }));
  const [selectedBar, setSelectedBar] = useState<tabData | null>(null);

  const handleBarClick = (id: string, event: ThreeEvent<MouseEvent>) => {
    const clickedBar: tabData | undefined = data.find((bar) => bar.id.toString() === id);
    console.log(clickedBar);

    const intersections = event.intersections;

    if (intersections[0]?.object === event.object)
      setSelectedBar(clickedBar ? clickedBar : null); // Salva la barra selezionata
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
        console.log(camera.rotation);
        
      }
    } else {
      setHoveredBar(null); // Nessuna barra sotto il mouse
    }}, 40);
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
  return (
    <>
      {
        data.map((d: tabData) => (
          <Bar
            row={d}
            xLabels={xLabels}
            zLabels={zLabels}
            isTransparent={
              selectedBar ? d.value < selectedBar.value : false // Trasparente se altezza minore della barra selezionata
            }
            userData={{ id: d.id }}
            onClick={handleBarClick}
/*             onHover={handleHover}
 */          />
        ))
      }
      <XAxis xLabels={Array.from(xLabels)} />
      <YAxis yValues={Array.from(yValues)} xAxisLength={6 * xLabels.size} />
      <ZAxis zLabels={Array.from(zLabels)} />
      {hoveredBar && <Tooltip position={tooltipPosition} bar={hoveredBar} />}
    </>
  );
}

export default BarChart;