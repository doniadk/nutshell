const axios = require("axios");

async function fetchCountryData(code) {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    const country = res.data[0];

    return {
      code,
      name: country.name.common,
      population: country.population,
      capital: country.capital?.[0] || "N/A",
      region: country.region,
      flags: country.flags.png,
    };
  } catch (error) {
    console.error(`Failed to fetch ${code}`, error.message);
    return null;
  }
}

module.exports = { fetchCountryData };
