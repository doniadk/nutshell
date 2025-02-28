const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
