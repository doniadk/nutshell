import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  SpotLight,
} from "@react-three/drei";
import Model from "./Model";

export default function WorldMap() {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [0, 9, 5], fov: 65 }}
    >
      <ambientLight intensity={0.5} />
      <SpotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="warehouse" />
      <Model />
      <ContactShadows position={[0, -0.1, 0]} blur={5} scale={200} far={10} />
      <axesHelper />
      <OrbitControls />
    </Canvas>
  );
}
