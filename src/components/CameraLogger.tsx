import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

function CameraLogger() {
    const { camera } = useThree(); // Accede alla camera attiva

    useEffect(() => {
        const handleMouseUp = () => {
            console.log('Camera properties:', {
                position: camera.position,
                rotation: camera.rotation,
/*                 fov: camera.fov,
 */            });
        };

        // Aggiungi il listener mouseup al montaggio
        window.addEventListener('mouseup', handleMouseUp);

        // Rimuovi il listener quando il componente viene smontato
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [camera]);

    return null; // Nessun contenuto visibile
}

export default CameraLogger;