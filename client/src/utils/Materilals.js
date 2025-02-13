import * as THREE from "three";
import React, { useMemo } from "react";
import createProceduralTexture from "./textureUtils";

// creating a custom hook, file can't be .jsx
const useMaterials = () => {
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

  return { baseMaterial, selectedMaterial, hoverMaterial };
};

export default useMaterials;
