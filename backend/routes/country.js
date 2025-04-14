import { Router } from "express";
import CountryDbModelProcess from "../controllers/countryController.js";

const countryRouter = Router();

// when calling country/{country}, it will:
// fetch data from db
// process it ( if going to use d3.js )
// send it to front: res.send(JSON format)
countryRouter.get("/:country", async (req, res) => {
  try {
    const { country } = req.params;
    const data = await CountryDbModelProcess(country);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default countryRouter;
