import React, { useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/model.glb");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Materials
  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "white",
      }),
    []
  );
  const selectedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#082A13",
      }),
    []
  );

  return (
    <group scale={11} position={[-1, -7, -0.5]}>
      {scene.children.map((child) => {
        if (!child.isMesh) return null;

        const isHovered = hoveredCountry === child.name;
        const isSelected = selectedCountry === child.name;

        const { position, material } = useSpring({
          position: [
            child.position.x,
            child.position.y,
            isHovered || isSelected ? child.position.z - -0.025 : child.position.z,
          ],
          material: isSelected ? selectedMaterial : baseMaterial,
          config: { mass: 1, tension: 170, friction: 26 },
        });

        const handlePointerOver = (event) => {
          event.stopPropagation();
          setHoveredCountry(child.name);
          document.body.style.cursor = "pointer";
        };

        const handlePointerOut = () => {
          setHoveredCountry(null);
          document.body.style.cursor = "default";
        };

        const handleClick = (event) => {
          event.stopPropagation();
          setSelectedCountry(
            child.name === selectedCountry ? null : child.name
          );
        };

        return (
          <animated.mesh
            key={child.name}
            geometry={child.geometry}
            position={position}
            rotation={child.rotation}
            scale={child.scale}
            material={material}
            castShadow
            receiveShadow
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
          />
        );
      })}
    </group>
  );
}

export default function InteractiveMap() {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [0, 4.5, 1], fov: 75 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        castShadow
        intensity={0.5}
      />
      <Environment preset="warehouse" />
      <Model />
      <ContactShadows position={[0, -0.1, 0]} blur={5} scale={200} far={10} />
    </Canvas>
  );
}
