import { ThreeEvent } from '@react-three/fiber';
import { tabData } from './BarChart';

type BarProps = {
    row: tabData;
    isTransparent: boolean;
    onClick: (id: string) => void;
    onHover?: (e: ThreeEvent<PointerEvent>, height: number | null) => void;
};

function Bar({ row, isTransparent, onClick/* , onHover */ }: BarProps) {
    const colors: string[] = ["red", "blue", "yellow"];
    const { id, label, value, color } = row;
    return (
        <mesh
            key={id}
            position={[label * 2 + 1, value / 2, color * 2 + 1]} // Alza la barra di metà altezza            
            onClick={() => onClick(id.toString())}
            /* onPointerMove={(e) => onHover(e, value)} // Trigger hover con altezza
            onPointerOut={(e) => onHover(e, null)} */ // Nasconde il tooltip all'uscita
        >
            {/* Geometria della barra */}
            < boxGeometry args={[0.8, value, 0.8]} />
            {/* Materiale della barra */}
            < meshPhysicalMaterial
                color={colors[color]}
                clearcoat={0.9} // Strato protettivo lucido
                transparent={true}
                opacity={isTransparent ? 0.4 : 1}
            />
        </mesh >
    );
}

export default Bar;