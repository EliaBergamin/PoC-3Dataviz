import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import myFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as THREE from 'three';
import { extend } from "@react-three/fiber";
extend({ TextGeometry });

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
  const labels = multiplesOfFive.map((value) => ({
    text: value.toString(),
    position: new THREE.Vector3(xAxisLength + 1, value, 0),
    rotation: new THREE.Euler(0, Math.PI, 0, 'XYZ')
  }));
  // Creazione delle linee degli assi
  const yAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(xAxisLength, 0, 0),
    new THREE.Vector3(xAxisLength, yAxisLength, 0),
  ]);

  /*  */
  const font = new FontLoader().parse(myFont);
  return (
    <>
      <line>
        <bufferGeometry attach="geometry" {...yAxis} />
        <lineBasicMaterial attach="material" color={yColor} />
      </line>
      {labels.map((label, index) => (
        <mesh key={index} position={label.position} rotation={label.rotation} >
          <textGeometry
            args={[label.text, { font, size: 0.5, depth: 0.02 }]}
          />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
      {/* <Html
                    key={index}
                    position={label.position}
                    rotation={label.rotation}
                    zIndexRange={[1, 0]}
                    style={{ pointerEvents: 'none', fontSize: '14px', transform: 'rotate(-90deg)', color: xColor, whiteSpace: 'nowrap' }}>
                    <div id={`x-label-${index}`}>{label.text}</div>
                </Html> 
            ))}*/}
    </>
  );
}

export default YAxis;