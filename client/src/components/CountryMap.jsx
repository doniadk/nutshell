import React, { useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

const hoverSound = new Audio("/sound_effect.mp3");
hoverSound.volume = 0.1;

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

  const meshRef = useRef();

  const isHovered = hoveredCountry === child.name;
  const isSelected = selectedCountry === child.name;
  const hasPlayedSound = useRef(false);

  const navigate = useNavigate();

  const { position, color } = useSpring({
    position: [
      child.position.x,
      isHovered || isSelected ? child.position.y + 0.08 : child.position.y,
      child.position.z,
    ],
    color: isSelected ? "green" : isHovered ? "grey" : "white",
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.shadowSide = isHovered ? THREE.FrontSide : null;
      meshRef.current.material.needsUpdate = true;
    }
  }, [isHovered]);

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setHoveredCountry(child.name);
    document.body.style.cursor = "pointer";

    if (!hasPlayedSound.current) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch((err) => console.warn(err));
      hasPlayedSound.current = true;
    }
  };

  const handlePointerOut = () => {
    setHoveredCountry(null);
    document.body.style.cursor = "default";
    hasPlayedSound.current = false;
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setSelectedCountry(child.name === selectedCountry ? null : child.name);
    navigate(`/country/${child.name}`);
  };

  return (
    <animated.mesh
      ref={meshRef}
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
        {...(isSelected
          ? selectedMaterial
          : isHovered
          ? hoverMaterial
          : baseMaterial)}
        color={color}
      />
    </animated.mesh>
  );
};

export default CountryMap;
