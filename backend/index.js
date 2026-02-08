const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const askGemini = require("./gemini");

const app = express();

// ✅ CORS (Express 5 compatible)
app.use(cors({
  origin: "https://ai-chat-buddy-jade.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 🤖 Ask Gemini route
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await askGemini(question);

    res.json({ answer });
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

// Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
