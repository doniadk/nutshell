import React from "react";
import { animated, useSpring } from "@react-spring/web";

function InfoPanel({ country }) {
  const data = {
    RU: { name: "Russia", population: "144M", capital: "Moscow" },
    TN: { name: "Tunisia", population: "12M", capital: "Tunis" },
    US: {
      name: "United States",
      population: "331M",
      capital: "Washington, D.C.",
    },
  };

  const info = data[country] || {
    name: "Unknown",
    population: "N/A",
    capital: "N/A",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
      }}
    >
      <h2>{info.name}</h2>
      <p>Capital: {info.capital}</p>
      <p>Population: {info.population}</p>
    </div>
  );
}

export default InfoPanel;
