import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import myFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as THREE from 'three';
import { extend } from "@react-three/fiber";
extend({ TextGeometry });

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
    position: new THREE.Vector3(-1, 0, 5 * index + 3),
    rotation: new THREE.Euler(0, Math.PI, 0, 'XYZ')
  }));

    
  const font = new FontLoader().parse(myFont);

  return (
    <>
      <line>
        <bufferGeometry attach="geometry" {...zAxis} />
        <lineBasicMaterial attach="material" color={zColor} />
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

export default ZAxis;