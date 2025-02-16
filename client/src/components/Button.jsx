import React, { useRef } from "react";
import gsap from "gsap";
import arrowImage from "/down-arrow.png";

export default function Button({ onClick }) {
  const buttonRef = useRef(null);
  const hoverZoneRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      opacity: 0.2,
      y: "-5px",
      duration: 0.3,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(hoverZoneRef.current, {
      opacity: 1,
      boxShadow: "0px 10px 30px rgb(0, 0, 0)", // Stronger shadow when hovering
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      opacity: 0,
      y: "0px",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(hoverZoneRef.current, {
      opacity: 0,
      boxShadow: "0px 5px 25px rgba(0, 0, 0, 0)", // Remove shadow
      duration: 0.3,
    });
  };

  const handleClick = () => {
    gsap.to(buttonRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(hoverZoneRef.current, {
      boxShadow: "none",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    onClick(); // execute the transition between pages animation
  };

  return (
    <div
      ref={hoverZoneRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        top: 0,
        left: "15vw",
        width: "70vw",
        height: "3px",
        zIndex: 1000, // Ensure it’s on top
        background: "rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 5px 25px rgb(0, 0, 0, 1)",
        cursor: "pointer",
      }}
    >
      <img
        ref={buttonRef}
        src={arrowImage}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        alt="Return Arrow"
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50px", // Keeps the arrow size
          height: "50px",
          cursor: "pointer",
          opacity: 0, // Fully hidden until hover
          transition: "opacity 0.3s ease",
          filter: "grayscale(20%) brightness(0.2)", // Makes the arrow gray
        }}
      />
    </div>
  );
}
