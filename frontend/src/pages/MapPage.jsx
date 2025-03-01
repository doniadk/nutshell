import React, { useState, useEffect, useRef } from "react";
import WorldMap from "../components/WorldMap";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function MapPage() {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      gsap.to(mapRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          navigate(`/country/${selectedCountry}`);
        },
      });
    }
  }, [selectedCountry, navigate]);

  return (
    <div
      ref={mapRef}
      style={{
        position: "absolute", // Ensure it stays over the background
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <WorldMap
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />
    </div>
  );
}
