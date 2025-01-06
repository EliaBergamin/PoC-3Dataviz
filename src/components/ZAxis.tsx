import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

type ZAxisProps = {
  zLabels: string[];
  zColor?: string;
};

function ZAxis({ zLabels, zColor = 'blue' }: ZAxisProps) {
  // Assi personalizzati con lunghezze differenti
  const zAxisLength = 5 * zLabels.length;

  // Creazione delle linee degli assi
  const zAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, zAxisLength),
  ]);
  const labels = zLabels.map((text, index) => ({
    text,
    position: new THREE.Vector3(0, 0, 5 * index + 3),
  }));
  useFrame(({ camera }) => {
    // Usa la posizione della camera per calcolare il ridimensionamento
    const xdistance = camera.position.x;
    const ydistance = camera.position.y;
    const distance = new THREE.Vector3(xdistance, ydistance, 0).length();
    labels.forEach((label, index) => {
      const element = document.getElementById(`z-label-${index}`);
/*       const distance = label.position.clone().add(camera.position.negate()).length();
 */      if (element) {
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
        <bufferGeometry attach="geometry" {...zAxis} />
        <lineBasicMaterial attach="material" color={zColor} />
      </line>
      {labels.map((label, index) => (
        <Html
          key={index}
          position={label.position}
          zIndexRange={[1, 0]}
          style={{ pointerEvents: 'none', fontSize: '14px', transform: 'rotate(30deg)', color: zColor }}>
          <div id={`z-label-${index}`}>{label.text}</div>
        </Html>
      ))}
    </>
  );
}

export default ZAxis;