const path = require("path");

// 🔒 Load .env using absolute path (PERMANENT FIX)
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");

const askGemini = require("./gemini");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Ask Gemini route
app.post("/ask", (req, res) => {
  console.log("✅ /ask route hit");
  console.log("Body:", req.body);

  return res.json({ answer: "TEST RESPONSE WORKING" });
});


// Port handling
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
