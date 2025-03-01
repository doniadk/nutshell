const express = require("express");
const Country = require("../models/Country");
const { fetchCountryData } = require("../services/fetchCountry");
const router = express.Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  let country = await Country.findOne({ code });

  if (!country) {
    const fetchedData = await fetchCountryData(code);

    if (fetchedData) {
      country = await Country.create(fetchedData);
    }
  }

  if (country) {
    res.json(country);
  } else {
    res.status(404).json({ message: "Country not found" });
  }
});

module.exports = router;
