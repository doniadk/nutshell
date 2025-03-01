import React, { useEffect, useState } from "react";
import axios from "axios";

function InfoPanel({ country }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/countries/${country}`
        );
        setInfo(res.data);
      } catch (error) {
        console.error("Failed to fetch country data", error);
        setInfo({ name: "Unknown", capital: "N/A", population: "N/A" });
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [country]);

  if (loading) {
    return <p>Loading country data...</p>;
  }

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
      <p>Region: {info.region}</p>
      <img src={info.flags} alt={info.name} width="100px" />
    </div>
  );
}

export default InfoPanel;
