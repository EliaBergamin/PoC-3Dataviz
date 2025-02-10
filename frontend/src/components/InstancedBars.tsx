import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useDataContext } from "./context";
import { tabData } from "../App";
import { ThreeEvent } from "@react-three/fiber";
import { COLORS } from "../libs/constants";


type InstancedBarsProps = {
    selectedBar: tabData | null;
};
function InstancedBars({ selectedBar }: InstancedBarsProps) {
    const { data, filteredData, setFilteredData, setSelectedBar, isGreaterChecked } = useDataContext();
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();
    const colorArray = useMemo(() => new Float32Array(data.length * 3), [data]); // Array di colori
    const opacityArray = useMemo(() => new Float32Array(data.length), [filteredData]); // Array opacità

    useEffect(() => {
        if (!meshRef.current) return;

        data.forEach((row, i) => {
            // Set posizione
            dummy.position.set(row.labelX * 6 + 3, row.value / 2, row.labelZ * 5 + 3);

            // Set scala (altezza della barra)
            dummy.scale.set(2, row.value, 2);

            dummy.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }

            // Imposta il colore per ogni istanza
            const isSelected = selectedBar ? row.id === selectedBar.id : false;
            const color = new THREE.Color(isSelected ? "black" : COLORS[row.labelZ]);
            color.toArray(colorArray, i * 3);

            // Opacità variabile
            const isFiltered = filteredData.some((f) => f.labelX === row.labelX && f.labelZ === row.labelZ && f.value === row.value);
            opacityArray[i] = isFiltered ? 1 : 0.1;
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [data]);

    // ShaderMaterial personalizzato con opacità variabile
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.opacity.value = opacityArray;
        }
    }, [opacityArray]);

    const handleBarClick = (id: number, event: ThreeEvent<MouseEvent>) => {
        const clickedBar: tabData | undefined = data.find((bar) => bar.id === id);

        const intersections = event.intersections;

        if (intersections[0]?.object === event.object) {
            if (clickedBar) {
                setSelectedBar(clickedBar); // Imposta la barra selezionata
                if (isGreaterChecked)
                    setFilteredData(data.filter((d) => d.value >= clickedBar.value)); // Filtra i dati
                else
                    setFilteredData(data.filter((d) => d.value <= clickedBar.value)); // Filtra i dati
            }
        }
    }

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, data.length]}
            onClick={(e) => {
                const id = e.instanceId; // Ottieni l'indice della barra cliccata
                if (id !== undefined) handleBarClick(data[id].id, e);
            }}
        >
            <boxGeometry args={[1, 1, 1]}>
                <instancedBufferAttribute attach="attributes-opacity" args={[opacityArray, 1]} />
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </boxGeometry>
            <shaderMaterial
                ref={materialRef}
                uniforms={{ opacity: { value: opacityArray } }}
                vertexShader={`
                    varying vec3 vColor;
                    varying float vOpacity;
                    attribute vec3 color;
                    attribute float opacity;
                    void main() {
                        vColor = color;
                        vOpacity = opacity;
                        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
                    }`
                }
                fragmentShader={`
                    varying vec3 vColor;
                    varying float vOpacity;
                    void main() {
                        gl_FragColor = vec4(vColor, vOpacity);
                    }`
                }
                transparent
                
            />
        </instancedMesh>
    );
};

export default InstancedBars;