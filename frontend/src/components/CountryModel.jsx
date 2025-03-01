import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react"; // For drag interaction
import useMaterials from "../utils/Materials";

function CountryModel({ country, isSelected }) {
  const { scene } = useGLTF(`/3d/country_models/${country}.glb`);
  const [model, setModel] = useState(null);
  const { countryMaterial } = useMaterials();
  const modelRef = useRef(); // Ref to the model for rotation
  const { camera, gl } = useThree(); // Access the camera and renderer

  // State to track whether the user is dragging
  const [isDragging, setIsDragging] = useState(false);

  // Spring animation (re-triggers when country changes)
  const [spring, setSpring] = useSpring(() => ({
    position: [-10, 0, 0], // Start off-screen
    config: { mass: 1, tension: 120, friction: 40 },
  }));

  useEffect(() => {
    if (scene) {
      console.log("Loaded scene:", scene);
      const cloneScene = scene.clone();

      // Apply material to meshes
      cloneScene.traverse((child) => {
        if (child.isMesh) {
          child.material = countryMaterial;
        }
      });

      // Center & Normalize Model
      const box = new THREE.Box3().setFromObject(cloneScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      cloneScene.position.sub(center);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      cloneScene.scale.set(scale, scale, scale);

      setModel(cloneScene);

      // Reset spring animation every time country changes
      setSpring.start({ position: [0, 0, 0] });
    }
  }, [scene, country, countryMaterial, setSpring]);

  // Drag interaction
  const bind = useDrag(
    ({ delta: [dx, dy], dragging }) => {
      if (dragging && modelRef.current) {
        // Rotate the model based on mouse movement
        modelRef.current.rotation.y += dy * 0.01; // Horizontal drag affects Y rotation
        modelRef.current.rotation.x += dx * 0.01; // Vertical drag affects X rotation
      }
      setIsDragging(dragging); // Update dragging state
      document.body.style.cursor = "pointer";
    },
    {
      pointerEvents: true, // Enable pointer events
    }
  );
  document.body.style.cursor = "default";

  // Continuous rotation (only when not dragging and selected)
  useFrame(({ clock }) => {
    if (modelRef.current && isSelected && !isDragging) {
      modelRef.current.rotation.z = clock.getElapsedTime() * -0.05; // Auto-rotate
    }
  });

  if (!model) return null;

  return (
    <a.primitive
      ref={modelRef} // Attach ref to the model
      object={model}
      {...spring}
      rotation={[-5.5, 0, 0]}
      {...bind()} // Bind drag interaction
    />
  );
}

export default CountryModel;
