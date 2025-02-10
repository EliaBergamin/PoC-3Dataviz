import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const InstancedBoxes = ({ count = 1000 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      dummy.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      dummy.scale.set(
        Math.random() * 2 + 0.5, // Larghezza variabile
        Math.random() * 2 + 0.5, // Altezza variabile
        Math.random() * 2 + 0.5  // Profondità variabile
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </instancedMesh>
  );
};

export default function Scene() {
  return (
    <Canvas camera={{ position: [10, 10, 10] }}>
      <ambientLight />
      <OrbitControls />
      <InstancedBoxes count={5000} />
    </Canvas>
  );
}