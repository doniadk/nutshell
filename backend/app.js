import express from "express";
import { PORT } from "./config/env.js";
import countryRouter from "./routes/country.js";
import connectToDB from "./database/mongodb.js";
import cors from "cors";

const app = express();

app.use(cors());

// Parse JSON bodies
app.use(express.json());

// API route, route enderer(countryRouter)
app.use("/country", countryRouter);

// app_instance.METHOD(param1: path, param2:callback func(request, response)=>{} )
app.get("/", (req, res) => {
  res.send("hello");
});

// to make the app listen to api calls:
//app.listen(port, callback func executed once server is active)
app.listen(PORT, async () => {
  //console.log(`Server running on port http://localhost:${PORT}`);

  await connectToDB();
});

export default app;
