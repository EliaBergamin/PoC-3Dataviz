/* import React, { useEffect, useRef } from 'react';*/
import * as THREE from 'three';
import { rawData } from '../App';
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import BarChart from './BarChart';
import CameraLogger from './CameraLogger';

function CustomCanvas() {
    const fetched_data: rawData[] = [
        { id: 1, labelX: 'Mele', value: 4, labelZ: 'Vicenza' },
        { id: 2, labelX: 'Pere', value: 5, labelZ: 'Vicenza' },
        { id: 3, labelX: 'Banane', value: 2, labelZ: 'Vicenza' },
        { id: 4, labelX: 'Mele', value: 8, labelZ: 'Padova' },
        { id: 5, labelX: 'Pere', value: 8, labelZ: 'Padova' },
        { id: 6, labelX: 'Banane', value: 15, labelZ: 'Padova' },
        { id: 7, labelX: 'Mele', value: 3, labelZ: 'Venezia' },
        { id: 8, labelX: 'Pere', value: 6, labelZ: 'Venezia' },
        { id: 9, labelX: 'Banane', value: 10, labelZ: 'Venezia' },
        { id: 10, labelX: 'Mele', value: 7, labelZ: 'Verona' },
        { id: 11, labelX: 'Pere', value: 9, labelZ: 'Verona' },
        { id: 12, labelX: 'Banane', value: 12, labelZ: 'Verona' },
        { id: 13, labelX: 'Kiwi', value: 5, labelZ: 'Verona' },
        { id: 14, labelX: 'Kiwi', value: 4, labelZ: 'Vicenza' },
        { id: 15, labelX: 'Kiwi', value: 8, labelZ: 'Padova' },
        { id: 16, labelX: 'Kiwi', value: 6, labelZ: 'Venezia' },
        { id: 17, labelX: 'Arance', value: 7, labelZ: 'Vicenza' },
        { id: 18, labelX: 'Arance', value: 5, labelZ: 'Padova' },
        { id: 19, labelX: 'Arance', value: 6, labelZ: 'Venezia' },
        { id: 20, labelX: 'Arance', value: 8, labelZ: 'Verona' },
        { id: 21, labelX: 'Fragole', value: 9, labelZ: 'Vicenza' },
        { id: 22, labelX: 'Fragole', value: 7, labelZ: 'Padova' },
        { id: 23, labelX: 'Fragole', value: 10, labelZ: 'Venezia' },
        { id: 24, labelX: 'Fragole', value: 12, labelZ: 'Verona' },
        { id: 25, labelX: 'Uva', value: 11, labelZ: 'Vicenza' },
        { id: 26, labelX: 'Uva', value: 13, labelZ: 'Padova' },
        { id: 27, labelX: 'Uva', value: 14, labelZ: 'Venezia' },
        { id: 28, labelX: 'Uva', value: 15, labelZ: 'Verona' },
        { id: 29, labelX: 'Mango', value: 10, labelZ: 'Vicenza' },
        { id: 30, labelX: 'Mango', value: 12, labelZ: 'Padova' },
        { id: 31, labelX: 'Mango', value: 14, labelZ: 'Venezia' },
        { id: 32, labelX: 'Mango', value: 16, labelZ: 'Verona' },
        { id: 33, labelX: 'Papaya', value: 11, labelZ: 'Vicenza' },
        { id: 34, labelX: 'Papaya', value: 13, labelZ: 'Padova' },
        { id: 35, labelX: 'Papaya', value: 15, labelZ: 'Venezia' },
        { id: 36, labelX: 'Papaya', value: 17, labelZ: 'Verona' },
        { id: 37, labelX: 'Pineapple', value: 12, labelZ: 'Vicenza' },
        { id: 38, labelX: 'Pineapple', value: 14, labelZ: 'Padova' },
        { id: 39, labelX: 'Pineapple', value: 16, labelZ: 'Venezia' },
        { id: 40, labelX: 'Pineapple', value: 18, labelZ: 'Verona' },
        { id: 41, labelX: 'Peach', value: 13, labelZ: 'Vicenza' },
        { id: 42, labelX: 'Peach', value: 15, labelZ: 'Padova' },
        { id: 43, labelX: 'Peach', value: 17, labelZ: 'Venezia' },
        { id: 44, labelX: 'Peach', value: 19, labelZ: 'Verona' },
        { id: 45, labelX: 'Plum', value: 14, labelZ: 'Vicenza' },
        { id: 46, labelX: 'Plum', value: 16, labelZ: 'Padova' },
        { id: 47, labelX: 'Plum', value: 18, labelZ: 'Venezia' },
        { id: 48, labelX: 'Plum', value: 20, labelZ: 'Verona' },
        { id: 49, labelX: 'Grapefruit', value: 15, labelZ: 'Vicenza' },
        { id: 50, labelX: 'Grapefruit', value: 17, labelZ: 'Padova' },
        { id: 51, labelX: 'Grapefruit', value: 19, labelZ: 'Venezia' },
        { id: 52, labelX: 'Grapefruit', value: 21, labelZ: 'Verona' },
        { id: 53, labelX: 'Cherry', value: 16, labelZ: 'Vicenza' },
        { id: 54, labelX: 'Cherry', value: 18, labelZ: 'Padova' },
        { id: 55, labelX: 'Cherry', value: 0, labelZ: 'Venezia' },
        { id: 56, labelX: 'Cherry', value: 22, labelZ: 'Verona' },
        { id: 57, labelX: 'Blueberry', value: 17, labelZ: 'Vicenza' },
        { id: 58, labelX: 'Blueberry', value: 9, labelZ: 'Padova' },
        { id: 59, labelX: 'Blueberry', value: 21, labelZ: 'Venezia' },
        { id: 60, labelX: 'Blueberry', value: 23, labelZ: 'Verona' },
        { id: 61, labelX: 'Blackberry', value: 8, labelZ: 'Vicenza' },
        { id: 62, labelX: 'Blackberry', value: 2, labelZ: 'Padova' },
        { id: 63, labelX: 'Blackberry', value: 22, labelZ: 'Venezia' },
        { id: 64, labelX: 'Blackberry', value: 4, labelZ: 'Verona' },
        { id: 65, labelX: 'Raspberry', value: 19, labelZ: 'Vicenza' },
        { id: 66, labelX: 'Raspberry', value: 11, labelZ: 'Padova' },
        { id: 67, labelX: 'Raspberry', value: 23, labelZ: 'Venezia' },
        { id: 68, labelX: 'Raspberry', value: 5, labelZ: 'Verona' }
    ];
    return (
        <Canvas

            data-cy="cy-canvas"
            data-testid="cy-canvas"
            gl={{ preserveDrawingBuffer: true }}
            camera={{ 
                position: [-fetched_data.length/8, 20, -fetched_data.length/4], 
                fov: 75,
                near: 0.1,
                far: 1000
            }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <BarChart fetched_data={fetched_data}></BarChart>
            <OrbitControls makeDefault
                target={[0, 0, 0]}
            />
            <GizmoHelper
                alignment='top-left'
                margin={[80, 80]}>
                <GizmoViewport
                    axisColors={['red', 'green', 'blue']}
                    labelColor='black' />
            </GizmoHelper>
            <CameraLogger/>
        </Canvas>
    );
}

export default CustomCanvas;