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
        color: "#0D2984",
        emissive: "grey",
        emissiveIntensity: 1,
        roughness: 0.01,
        metalness: 1,
      }),
    [baseTexture]
  );

  const selectedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#082A13",
        emissive: "#343771",
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.8,
      }),
    []
  );

  const hoverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#082A13",
        emissive: "#343771",
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.8,
      }),
    []
  );

  const countryMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: baseTexture,
        color: "#D1B57F",
        emissive: "#0D2984",
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.8,
      }),
    [baseTexture]
  );

  return {
    baseMaterial,
    selectedMaterial,
    hoverMaterial,
    countryMaterial, // Newly added material
  };
};

export default useMaterials;
