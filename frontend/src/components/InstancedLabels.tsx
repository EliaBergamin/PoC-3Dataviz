import * as THREE from 'three';

const createTextCanvas = (text: string, textColor: string, backgroundColor: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256*3;
    canvas.height = 64*3;

    if (!context) {
        return null;
    }
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height); // Sfondo pieno

    // Imposta il colore del testo
    context.fillStyle = textColor;
    context.font = '90px Arial';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(text, 10, 10);

    return new THREE.CanvasTexture(canvas);
};

type LabelsProps = {
    labels: {
        text: string;
        position: THREE.Vector3;
        rotation: THREE.Euler;
    }[];
};

const InstancedLabels = ({ labels }: LabelsProps) => {
    return (
        <>
            {labels.map((label, index) => (
                <mesh key={index} position={label.position} rotation={label.rotation}>
                    <planeGeometry args={[3, 0.75]} />
                    <meshBasicMaterial
                        key={index}
                        attach="material"
                        map={createTextCanvas(label.text, 'black', 'white')}
                    />
                </mesh>
            ))}
        </>
    );
};

export default InstancedLabels;