import { tabData } from '../App';
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, OrbitControls, BakeShadows, AdaptiveDpr } from '@react-three/drei';
import BarChart from './BarChart';
import CameraLogger from './CameraLogger';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { Perf } from 'r3f-perf';

type CustomCanvasProps = {
  selectedBar: tabData | null;
};

function CustomCanvas({ selectedBar }: CustomCanvasProps) { //TODO 7

  /* console.log(selectedBar); 
  const [position, setPosition] = useState([3.4301854408067705, 13.60071277758357, -32.28290921318735]);
  useEffect(() => {
      setPosition(selectedBar ? [selectedBar.labelX, selectedBar.value, selectedBar.labelZ] : );
  }, [selectedBar]);
  console.log(position); */
  const controls = useRef<any>(null); // Riferimento a OrbitControls
  const initialCameraPosition = [10, 15, -55];
  const initialTarget = [50, 0.5, 5];
  const initialZoom = 1;

  const resetCamera = () => {
    const camera = controls.current.object; // Ottieni la camera da OrbitControls

    if (camera) {

      //console.log('Before reset:', camera.position, controls.current.target, camera.zoom);
      camera.position.set(...initialCameraPosition);
      controls.current.target.set(...initialTarget);

      gsap.to(camera, {
        zoom: initialZoom,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });

      controls.current.update(); // Sincronizza i controlli
      //console.log('After reset:', camera.position, controls.current.target, camera.zoom);
    }
  };

  return (
    <>
      <button id="resetCamera" onClick={resetCamera}>Reset camera</button> {/* TODO 3 */}
      <Canvas
        id='canvas'
        data-cy="cy-canvas"
        data-testid="cy-canvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: [10, 15, -55],
          rotation: [-3.025, -0.38, 3.2],
          fov: 55,
          near: 0.1,
          far: 1000
        }}>
        <AdaptiveDpr pixelated /> {/* Riduce automaticamente la risoluzione */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BarChart
          selectedBar={selectedBar} />

        <OrbitControls makeDefault
          ref={controls}
          target={[50, 0.5, 5]}
          dampingFactor={0.1}
        />
        <GizmoHelper
          alignment='top-left'
          margin={[60, 60]}>
          <GizmoViewport
            axisColors={['red', 'green', 'blue']}
            labelColor='black' />
        </GizmoHelper>
        <Perf position='top-right'/>
        <CameraLogger />
      </Canvas>
    </>
  );
}

export default CustomCanvas;