import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/infoPanel.css";

function InfoPanel({ country }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${country}`
        );
        setInfo(res.data[0]);
        console.log(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch country data", error);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [country]);

  return (
    <div className="info-panel-container">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-wrapper"
          >
            <div className="loading-spinner" />
            <p className="loading-text">Loading country data...</p>
          </motion.div>
        ) : info ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="content-container"
          >
            <div className="content-flex">
              {/* Country Info */}
              <div className="country-info">
                <div className="flag-title-container">
                  {/* Flag Image */}
                  <motion.div
                    className="flag-container"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img
                      src={info.flags.svg}
                      className="flag-image"
                      alt="Country Flag"
                    />
                  </motion.div>
                  <h1 className="country-title">
                    {info.altSpellings?.[1] || info.name?.common}
                  </h1>
                </div>
                <div className="info-grid">
                  <InfoItem
                    label="Capital"
                    value={info.capital?.[0] || "N/A"}
                    icon="/images/government-flag.png"
                  />
                  <InfoItem
                    label="Currency"
                    value={
                      info.currencies
                        ? Object.values(info.currencies)
                            .map((c) => `${c.name} (${c.symbol})`)
                            .join(", ")
                        : "N/A"
                    }
                    icon="/images/coins.png"
                  />
                  <InfoItem
                    label="Population"
                    value={info.population?.toLocaleString() || "N/A"}
                    icon="/images/population.png"
                  />
                  <InfoItem
                    label="Area"
                    value={`${(info.area ?? 0).toLocaleString()} km²`}
                    icon="/images/globe-alt.png"
                  />
                  <InfoItem
                    label="GDP"
                    value={`$${(info.timezones[0] ?? 0).toLocaleString()} M`}
                    icon="/images/chat-arrow-grow.png"
                  />
                  <InfoItem
                    label="Languages"
                    value={
                      info.languages
                        ? Object.values(info.languages).join(", ")
                        : "N/A"
                    }
                    icon="/images/triangle-person-digging.png"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error-message"
          >
            Country not found or failed to load.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InfoItem = ({ label, value, icon }) => (
  <motion.div
    className="info-item"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="info-item-icon">
      <img src={icon} alt="icon" className="icon-image" />
    </div>
    <div className="info-item-text">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  </motion.div>
);

export default InfoPanel;
