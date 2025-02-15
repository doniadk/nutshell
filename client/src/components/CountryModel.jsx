import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";
import useMaterials from "../utils/Materials";

function CountryModel({ country, isSelected }) {
  const { scene } = useGLTF(`/country_models/${country}.glb`);
  const [model, setModel] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { countryMaterial } = useMaterials();

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

      // Create a bounding box around the model to determine its dimensions
      const box = new THREE.Box3().setFromObject(cloneScene);

      // Create a vector to store the center of the bounding box
      const center = new THREE.Vector3();
      box.getCenter(center); // Get the center point of the bounding box

      // Move the model so that its center aligns with the scene's origin (0,0,0)
      cloneScene.position.sub(center);

      // Get the size (width, height, depth) of the bounding box
      const size = box.getSize(new THREE.Vector3());

      // Find the largest dimension of the model (to ensure uniform scaling)
      const maxDim = Math.max(size.x, size.y, size.z);

      // Calculate a scale factor to normalize the model's size
      // This ensures that the largest dimension fits within a 2-unit box
      const scale = 2 / maxDim;

      // Apply the calculated scale to the model
      // This ensures the entire model fits within the same size constraints
      cloneScene.scale.set(scale, scale, scale);

      setModel(cloneScene);

      // Reset spring animation every time country changes
      setSpring.start({ position: [0, 0, 0] });
    }
  }, [scene, country, countryMaterial, setSpring]);

  // Continuous rotation
  useFrame(({ clock }) => {
    if (model && isSelected) {
      model.rotation.z = clock.getElapsedTime() * -0.05;
    }
  });

  const handleDragMouse = () =>{

  }

  if (!model) return null;

  return <a.primitive object={model} {...spring} rotation={[-5.5, 0, 0]} />;
}

export default CountryModel;
