import axios from "axios";
import Country from "../models/countryData.js";
import { API_KEY } from "../config/env.js";

const api_key = API_KEY;

async function CountryDbModelProcess(countryID) {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/country", {
      params: { name: countryID },
      headers: {
        "X-Api-Key": api_key,
      },
    });

    const flagApiResponse = await axios.get(
      `https://api.api-ninjas.com/v1/countryflag?country=${countryID}`,
      {
        headers: {
          "X-Api-Key": api_key,
        },
      }
    );

    const country = response.data[0];
    const countryFlag = flagApiResponse.data.rectangle_image_url;
    console.log("api response:", countryFlag);

    const countryApiData = {
      country_id: countryID,
      name: country.name,
      region: country.region,
      capital: country.capital,
      population: country.population,
      gdp: country.gdp,
      currency: `${country.currency.name}: ${country.currency.code}`,
      unemployment: country.unemployment,
      flag: countryFlag,
      languages: country.languages || ["Unknown"],
      surface_area: country.surface_area,
    };

    // findById didn't work, Reason: expects an ObjectId, but findOne allows searching by other fields.
    const databaseModel = await Country.findOneAndUpdate(
      { country: countryApiData.name }, // name used as the id
      {
        sourceAPI: "https://api.api-ninjas.com/v1/country",
        CountryData: countryApiData,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    return databaseModel;
  } catch (error) {
    console.log("Error fetching country data:", error);
  }
}

export default CountryDbModelProcess;
