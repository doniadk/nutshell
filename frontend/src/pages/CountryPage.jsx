import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import CountryDisplay from "../components/CountryDisplay";
import InfoPanel from "../components/InfoPanel";
import Button from "../components/button";

export default function CountryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const countryRef = useRef(null);
  const infoRef = useRef(null);
  const worldMapRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      countryRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      infoRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  const handleButtonClick = () => {
    gsap.to(worldMapRef.current, {
      y: "100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(countryRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(infoRef.current, { x: "100%", duration: 1, ease: "power2.inOut" });

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <Button onClick={handleButtonClick} />
      <div
        ref={worldMapRef}
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
        }}
      ></div>
      <div
        ref={pageRef}
        style={{ display: "flex", height: "100vh", width: "100vw", opacity: 0 }}
      >
        {/* Left Half: 3D Country Model */}
        <div ref={countryRef} style={{ width: "70%", height: "100%" }}>
          <CountryDisplay country={id} />
        </div>

        {/* Right Half: Info Panel */}
        <div
          ref={infoRef}
          style={{
            width: "50%",
            height: "90%",
            background: "rgba(222, 222, 222, 0.7)",
            color: "#5E5AB0",
            padding: "20px",
            marginTop: "60px",
            overflowY: "auto",
            boxShadow: "-5px 5px 30px rgba(0,0,0,0.5)",
            borderRadius: "30px 0px 0px 30px",
          }}
        >
          <InfoPanel country={id} />
        </div>
      </div>
    </div>
  );
}
