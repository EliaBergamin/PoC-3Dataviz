/* import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; */
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import BarChart from './BarChart';

function CustomCanvas() {
    return (
        <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [20, 5, 40], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <BarChart></BarChart>
            <OrbitControls makeDefault />
            <GizmoHelper
                alignment='top-left'
                margin={[80, 80]}>
                <GizmoViewport 
                    axisColors={['red', 'green', 'blue']} 
                    labelColor='black'/>
            </GizmoHelper>       
        </Canvas>
    );
}

export default CustomCanvas;