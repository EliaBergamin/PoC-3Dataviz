import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import myFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as THREE from 'three';
import { extend, Object3DNode } from "@react-three/fiber";
extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

type XAxisProps = {
    xLabels: string[];
    xColor?: string;
};

function XAxis({ xLabels, xColor = 'red' }: XAxisProps) {
    // Assi personalizzati con lunghezze differenti
    const xAxisLength = 6 * xLabels.length;

    // Creazione delle linee degli assi
    const xAxis = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(xAxisLength, 0, 0),
    ]);
    const labels = xLabels.map((text, index) => ({
        text,
        position: new THREE.Vector3(6 * index + 4, -1, 0),
        rotation: new THREE.Euler(0, Math.PI, 0, 'XYZ')
    }));
    
    const font = new FontLoader().parse(myFont);

    return (
        <>
            {/* Asse X */}
            <line>
                <bufferGeometry attach="geometry" {...xAxis} />
                <lineBasicMaterial attach="material" color={xColor} />
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

export default XAxis;