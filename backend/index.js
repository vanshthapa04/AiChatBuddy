const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const askGemini = require("./gemini");

const app = express();

// ✅ FIXED CORS
app.use(cors({
  origin: "https://ai-chat-buddy-jade.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ Working /ask route
app.post("/ask", async (req, res) => {
  try {
    console.log("✅ /ask route hit");
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // TEMP TEST (replace later with Gemini)
    const answer = "TEST RESPONSE WORKING";

    res.json({ answer });
  } catch (err) {
    console.error("❌ Error in /ask:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Port handling
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
