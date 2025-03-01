require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/countries", require("./routes/countries"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
