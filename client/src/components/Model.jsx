import React, { useState } from "react";
import CountryMap from "./CountryMap";
import useMaterials from "../utils/Materilals";
import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/map3.glb");
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
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
