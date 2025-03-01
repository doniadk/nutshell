const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: String,
  population: String,
  capital: String,
  region: String,
  flags: String,
});

module.exports = mongoose.model("Country", CountrySchema);
