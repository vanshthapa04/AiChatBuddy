const axios = require("axios");

const askGemini = async (question) => {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      contents: [
        {
          role: "user",
          parts: [{ text: question }],
        },
      ],
    },
    {
      params: {
        key: process.env.GEMINI_API_KEY,
      },
      timeout: 10000,
    }
  );

  if (!response.data.candidates?.length) {
    throw new Error("No response from Gemini");
  }

  return response.data.candidates[0].content.parts[0].text;
};

module.exports = askGemini;
