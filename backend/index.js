const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const askGemini = require("./gemini");

const app = express();

/* =======================
   CORS CONFIG (PRODUCTION)
   ======================= */
app.use(
  cors({
    origin: "https://ai-chat-buddy-jade.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* =======================
   HEALTH CHECK
   ======================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =======================
   ASK AI ROUTE
   ======================= */
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await askGemini(question);

    return res.json({ answer });
  } catch (error) {
    console.error("❌ Error in /ask:", error);
    return res.status(500).json({ error: "AI failed to respond" });
  }
});

/* =======================
   START SERVER
   ======================= */
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
