const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(question) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"   // ✅ correct, stable model
    });

    const result = await model.generateContent(question);

    return result.response.text();
  } catch (err) {
    console.error("❌ Gemini SDK Error:", err);
    throw err;
  }
}

module.exports = askGemini;

