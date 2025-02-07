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
  const { scene } = useGLTF("/map3.glb");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Materials
  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "grey",
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

  const hoverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "grey",
        emissive: "black",
        emissiveIntensity: 0.5,
      }),
    []
  );

  return (
    <group scale={2.5} position={[-12.5, 0, -8.5]}>
      {scene.children.map((child) => {
        if (!child.isMesh) return null;

        const isHovered = hoveredCountry === child.name;
        const isSelected = selectedCountry === child.name;

        const { position, material } = useSpring({
          position: [
            child.position.x,
            child.position.y,
            isHovered || isSelected ? child.position.z - 0.1 : child.position.z,
          ],
          material: isSelected
            ? selectedMaterial
            : isHovered
            ? hoverMaterial
            : baseMaterial,
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
      camera={{ position: [0, 10, 2], fov: 75 }}
    >
      <Environment preset="warehouse" />
      <Model />
      <ContactShadows position={[0, -0.1, 0]} blur={5} scale={200} far={10} />
      <axesHelper />
    </Canvas>
  );
}
