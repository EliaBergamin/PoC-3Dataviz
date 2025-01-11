import { tabData } from '../App';
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import BarChart from './BarChart';
import CameraLogger from './CameraLogger';
import { useRef } from 'react';

type CustomCanvasProps = {
    selectedBar: tabData | null;
};

function CustomCanvas({ selectedBar }: CustomCanvasProps) {

    /* console.log(selectedBar);
    const [position, setPosition] = useState([3.4301854408067705, 13.60071277758357, -32.28290921318735]);
    useEffect(() => {
        setPosition(selectedBar ? [selectedBar.labelX, selectedBar.value, selectedBar.labelZ] : );
    }, [selectedBar]);
    console.log(position); */
    const controls = useRef<any>(null); // Riferimento a OrbitControls
  const initialCameraPosition = [3.4301854408067705, 13.60071277758357, -32.28290921318735];
  const initialTarget = [25, 0, 10];

  const resetCamera = () => {
    const camera = controls.current.object; // Ottieni la camera da OrbitControls

    if (camera) {
      camera.position.set(...initialCameraPosition);
      controls.current.target.set(...initialTarget);
      controls.current.update(); // Sincronizza i controlli
    }
  };

    return (
        <>
        <button id="resetCamera" onClick={resetCamera}>Reset camera</button>
        <Canvas
            id='canvas'
            data-cy="cy-canvas"
            data-testid="cy-canvas"
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                position: [3.4301854408067705, 13.60071277758357, -32.28290921318735],
                rotation: [-3.025, -0.38, 3.2],
                fov: 75,
                near: 0.1,
                far: 1000
            }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <BarChart
                selectedBar={selectedBar} />

            <OrbitControls makeDefault
                ref={controls}
                target={[25, 0, 10]}
                dampingFactor={0.1}
            />
            <GizmoHelper
                alignment='top-left'
                margin={[60, 60]}>
                <GizmoViewport
                    axisColors={['red', 'green', 'blue']}
                    labelColor='black' />
            </GizmoHelper>
            <CameraLogger />
        </Canvas>
        </>
    );
}

export default CustomCanvas;