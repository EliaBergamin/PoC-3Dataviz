import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { text } from "stream/consumers";
import * as THREE from 'three';

type YAxisProps = {
  yValues: number[];
  yColor?: string;
  xAxisLength: number;
};

function YAxis({ yValues, yColor = 'green', xAxisLength }: YAxisProps) {
  // Assi personalizzati con lunghezze differenti
  const maxValue = Math.max(...yValues);
  const yAxisLength = maxValue + 2;
  const multiplesOfFive: number[] = [];
  for (let i = 0; i <= maxValue; i += 5) {
    multiplesOfFive.push(i);
  }
  const labels = multiplesOfFive.map((value, index) => ({
    text: value.toString(),
    position: new THREE.Vector3(xAxisLength, value, 0),
  }));
  // Creazione delle linee degli assi
  const yAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(xAxisLength, 0, 0),
    new THREE.Vector3(xAxisLength, yAxisLength, 0),
  ]);

  useFrame(({ camera }) => {
    const zdistance = camera.position.z;
    const xdistance = camera.position.x;
    const distance = new THREE.Vector3(xdistance-xAxisLength, 0, zdistance).length();
    // Usa la posizione della camera per calcolare il ridimensionamento
    multiplesOfFive.forEach((label, index) => {
      const element = document.getElementById(`y-label-${index}`);
      if (element) {
        let scale: number;

        if (distance < 40) {
            scale = 1;
        }
        else if (distance > 100) {
            scale = 0.4;

        }
        else {
            scale = 40 / distance;
        }
        element.style.transform = `scale(${scale})`;
    }
    });
  });

  return (
    <>
      <line>
        <bufferGeometry attach="geometry" {...yAxis} />
        <lineBasicMaterial attach="material" color={yColor} />
      </line>
      {labels.map((label, index) => (
        <Html
          key={index}
          position={label.position}
          zIndexRange={[1, 0]}
          style={{ pointerEvents: 'none', fontSize: '14px', color: yColor }}>
          <div id={`y-label-${index}`}>{label.text}</div>
        </Html>
      ))}
    </>
  );
}

export default YAxis;