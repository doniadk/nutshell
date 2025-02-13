import React from "react";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

const CountryMap = ({
  child,
  hoveredCountry,
  selectedCountry,
  setHoveredCountry,
  setSelectedCountry,
  baseMaterial,
  selectedMaterial,
  hoverMaterial,
}) => {
  if (!child.isMesh) return null;

  const isHovered = hoveredCountry === child.name;
  const isSelected = selectedCountry === child.name;

  const { position, color } = useSpring({
    position: [
      child.position.x,
      isHovered || isSelected ? child.position.y + 0.1 : child.position.y,
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
    setSelectedCountry(child.name === selectedCountry ? null : child.name);
    console.log(child.name);
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
      selectedCountry={selectedCountry}
    >
      <animated.meshStandardMaterial
        {...(isSelected
            ? selectedMaterial
            : isHovered
            ? hoverMaterial
            : baseMaterial)} // Preserve the base material properties
        color={color} // Animate only the color
      />
    </animated.mesh>
  );
};

export default CountryMap;
