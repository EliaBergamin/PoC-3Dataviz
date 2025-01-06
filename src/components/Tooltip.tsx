import { rawData } from '../App';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';

type TooltipProps = {
    bar: rawData;
    position: Vector3;
};

function Tooltip({ bar, position }: TooltipProps) {
    return (
        <Html position={position} key={bar.id}>
          <div style={{ background: "white", width: "100px",
            padding: "3px", borderRadius: "5px", 
            boxShadow: "0 0 5px rgba(0,0,0,0.3)" }}>
            Altezza: {bar.value} <br />
            Città: {bar.labelZ} <br />
            Merce: {bar.labelX}
          </div>
        </Html>
    );
}

export default Tooltip;