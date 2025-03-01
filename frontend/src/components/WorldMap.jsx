import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  SpotLight,
} from "@react-three/drei";
import Model from "./Model";

export default function WorldMap({ setSelectedCountry, selectedCountry }) {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [0, 9, 5], fov: 65 }}
      dpr={window.devicePixelRatio}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <Environment preset="warehouse" />
      <Model
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
      <mesh
        rotation={[-Math.PI / -1, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <ContactShadows position={[0, -0.1, 0]} blur={5} scale={200} far={10} />
    </Canvas>
  );
}
