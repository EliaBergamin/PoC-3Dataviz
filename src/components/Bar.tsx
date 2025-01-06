import { ThreeEvent } from '@react-three/fiber';
import { tabData } from './BarChart';
import { rawData } from '../App';

type BarProps = {
    row: tabData;
    xLabels: Set<string>;
    zLabels: Set<string>;
    isTransparent: boolean;
    userData: Record<string, any>;
    onClick: (id: string, e: ThreeEvent<MouseEvent>) => void;
    onHover?: (e: ThreeEvent<PointerEvent>, bar: rawData | null) => void;
};

function Bar({ row, xLabels, zLabels, isTransparent, userData, onClick }: BarProps) {
    const colors: string[] = ["red", "blue", "yellow"];
    const { id, labelX, value, labelZ } = row;
/*     const rawRow: rawData = {
        id: id,
        labelX: Array.from(xLabels)[labelX],
        value: value,
        labelZ: Array.from(zLabels)[labelZ]
    }; */
    return (
        <mesh
            key={id}
            position={[labelX * 6 + 3, value / 2, labelZ * 5 + 3]} // Alza la barra di metà altezza            
            onClick={(e) => onClick(id.toString(), e)}
            /* onPointerMove={(e) => onHover(e, rawRow)} // Trigger hover con altezza
            onPointerOut={(e) => onHover(e, null)} */ // Nasconde il tooltip all'uscita
            userData={userData}
        >
            {/* Geometria della barra */}
            < boxGeometry args={[2, value, 2]} />
            {/* Materiale della barra */}
            < meshPhysicalMaterial
                color={colors[labelZ]}
                clearcoat={0.9} // Strato protettivo lucido
                transparent={true}
                opacity={isTransparent ? 0.2 : 1}
            />
        </mesh >
    );
}

export default Bar;