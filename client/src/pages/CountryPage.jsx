import React from "react";
import { useParams } from "react-router-dom";
import CountryDisplay from "../components/CountryDisplay";
import InfoPanel from "../components/InfoPanel";
import { animated, useSpring } from "@react-spring/web";

export default function CountryPage() {
  // Grab the :id param from the URL (e.g., /country/US)
  const { id } = useParams();

  // Animation: Slide in from the right
  const spring = useSpring({
    from: { transform: "translateX(100%)", opacity: 0 },
    to: { transform: "translateX(0%)", opacity: 1 },
    config: { mass: 1, tension: 120, friction: 40 },
  });

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Left Half: 3D Model */}
      <div style={{ width: "70%", height: "100%" }}>
        <CountryDisplay country={id} />
      </div>

      {/* Right Half: Info Panel */}
      <animated.div
        style={{
          ...spring,
          width: "50%",
          height: "90%",
          background: "rgba(222, 222, 222, 0.7)",
          color: "#5E5AB0",
          padding: "20px",
          marginTop: "60px",
          overflowY: "auto", // Ensures scrolling if content is long
          boxShadow: "-5px 5px 30px rgba(0,0,0,0.5)",
          borderRadius: "30px 0px 0px 30px",
        }}
      >
        <InfoPanel country={id} />
      </animated.div>
    </div>
  );
}
