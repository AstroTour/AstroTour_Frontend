import React from "react";
import { Canvas } from "@react-three/fiber";

function SolarSystemMesh() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default function SolarSystem() {
  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-md m-4 flex items-center justify-center">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <SolarSystemMesh />
      </Canvas>
    </div>
  );
}
