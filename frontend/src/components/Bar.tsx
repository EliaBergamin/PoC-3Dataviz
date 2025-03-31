import { ThreeEvent } from "@react-three/fiber";
import { Entry, tabData } from "../App";

type BarProps = {
  row: tabData;
  isFiltered: boolean;
  aura: boolean;
  userData: Record<string, number>;
  onClick: (id: string, e: ThreeEvent<MouseEvent>) => void;
  onHover?: (e: ThreeEvent<PointerEvent>, bar: Entry | null) => void;
};

function Bar({ row, isFiltered, aura, userData, onClick }: BarProps) {
  const colors: string[] = ["red", "blue", "yellow"];
  const { id, x, y, z } = row;

  return (
    <mesh
      key={id}
      position={[x * 6 + 3, y / 2, z * 5 + 3]} // Alza la barra di metà altezza
      onClick={(e) => onClick(id.toString(), e)}
      /* onPointerMove={(e) => onHover(e, rawRow)} // Trigger hover con altezza
            onPointerOut={(e) => onHover(e, null)} */ // Nasconde il tooltip all'uscita
      userData={userData}
    >
      {/* Geometria della barra */}
      <boxGeometry args={[2, y, 2]} />
      {/* Materiale della barra */}
      <meshPhysicalMaterial
        color={aura ? "black" : colors[z]}
        clearcoat={0.9} // Strato protettivo lucido
        transparent={true}
        opacity={isFiltered ? 1 : 0.1}
      />
    </mesh>
  );
}

export default Bar;
