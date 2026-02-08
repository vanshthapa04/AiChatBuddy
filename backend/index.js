const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");

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

// Ask route
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  console.log("Question:", question);

  res.json({
    answer: "TEST RESPONSE WORKING"
  });
});

// Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
