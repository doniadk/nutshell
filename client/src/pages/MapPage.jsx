import React, { useState } from "react";
import WorldMap from "../components/WorldMap";
import CountryDisplay from "../components/CountryDisplay";
import InfoPanel from "../components/InfoPanel";

export default function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 1) Fullscreen World Map (Layer 1) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "transform 1s ease-in-out",
          transform: selectedCountry ? "translateY(-100%)" : "translateY(0%)",
        }}
      >
        <WorldMap
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  );
}
