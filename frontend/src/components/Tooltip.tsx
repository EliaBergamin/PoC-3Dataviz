import { tabData } from '../App';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { useDataContext } from './context';

type TooltipProps = {
    bar: tabData;
    position: Vector3;
};

function Tooltip({ bar, position }: TooltipProps) {
    const { xLabels, zLabels } = useDataContext();
    return (
        <Html position={position} key={bar.id}>
          <div style={{ background: "white", width: "150px",
            padding: "3px", borderRadius: "5px", 
            boxShadow: "0 0 5px rgba(0,0,0,0.3)" }}>
            Altezza: {bar.value} <br />
            Città: {zLabels[bar.labelZ]} <br />
            Merce: {xLabels[bar.labelX]}
          </div>
        </Html>
    );
}

export default Tooltip;