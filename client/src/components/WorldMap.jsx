import React, { useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
  SpotLight,
} from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/map3.glb");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Procedural Texture for Base Material
  const baseTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(createProceduralTexture(512, 512));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2); // Adjust repetition for tiling
    return texture;
  }, []);

  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: baseTexture,
        roughness: 0.8, // Increased roughness for a matte look
      }),
    [baseTexture]
  );

  const selectedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#082A13", // Dark green for selected country
        roughness: 0.6,
      }),
    []
  );

  const hoverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#666666", // Darker grey for hovered country
        emissive: "#000000",
        emissiveIntensity: 0.5,
        roughness: 0.5,
      }),
    []
  );

  return (
    <group scale={2.5} position={[-12.5, 0, -8.5]}>
      {scene.children.map((child) => {
        if (!child.isMesh) return null;

        const isHovered = hoveredCountry === child.name;
        const isSelected = selectedCountry === child.name;

        const { position, color } = useSpring({
          position: [
            child.position.x,
            isHovered || isSelected
              ? child.position.y - -0.1
              : child.position.y,
            child.position.z,
          ],
          color: isSelected
            ? "green" // Selected color
            : isHovered
            ? "grey" // Hover color
            : "white", // Base color
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
            castShadow
            receiveShadow
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
          >
            <animated.meshStandardMaterial
              {...baseMaterial} // Preserve the base material properties
              color={color} // Animate only the color
            />
          </animated.mesh>
        );
      })}
    </group>
  );
}

// Helper Function to Create Procedural Texture
function createProceduralTexture(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  // Create a gradient background with darker shades
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#555555"); // Lighter dark grey
  gradient.addColorStop(1, "#777777"); // Lighter grey
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  // Add subtle noise for texture
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 20; // Reduced noise intensity for smoother texture
    data[i] += noise; // Red
    data[i + 1] += noise; // Green
    data[i + 2] += noise; // Blue
  }
  context.putImageData(imageData, 0, 0);

  return canvas;
}

export default function WorldMap() {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [0, 10, 2], fov: 75 }}
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
    </Canvas>
  );
}
