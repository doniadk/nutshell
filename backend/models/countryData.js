import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true,
  },
  sourceAPI: String,
  CountryData: mongoose.Schema.Types.Mixed,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
