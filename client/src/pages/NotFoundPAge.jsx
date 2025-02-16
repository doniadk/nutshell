import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const notFoundRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      notFoundRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <div
      ref={notFoundRef}
      style={{
        textAlign: "center",
        paddingTop: "50px",
        opacity: 0,
        width: "100vw",
        height: "100vh",
        color: "#343771",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <Link to={"/"}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "20px",
            color: "#343771",
            borderColor: "#343771",
            cursor: "pointer",
          }}
        >
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
