import React, { useState } from "react";
import CountryMap from "./CountryMap";
import useMaterials from "../utils/Materials";
import { useGLTF } from "@react-three/drei";

function Model({ setSelectedCountry, selectedCountry }) {
  const { scene } = useGLTF("https://nutshell-front.onrender.com/3d/country_models/3d/map3.glb");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const { baseMaterial, selectedMaterial, hoverMaterial } = useMaterials();

  return (
    <group scale={2.5} position={[-12.5, 0, -10]}>
      {scene.children.map((child) => {
        return (
          <CountryMap
            key={child.name}
            child={child}
            hoveredCountry={hoveredCountry}
            selectedCountry={selectedCountry}
            setHoveredCountry={setHoveredCountry}
            setSelectedCountry={setSelectedCountry}
            baseMaterial={baseMaterial}
            selectedMaterial={selectedMaterial}
            hoverMaterial={hoverMaterial}
          />
        );
      })}
    </group>
  );
}

export default Model;
