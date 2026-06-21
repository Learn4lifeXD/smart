const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GOOGLE_API_KEY;
console.log("Key length:", apiKey ? apiKey.length : 0);
console.log("Key prefix:", apiKey ? apiKey.substring(0, 4) : "N/A");

try {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: ["Test"]
  }).then(res => {
    console.log("Success:", res.text);
  }).catch(err => {
    console.error("SDK Error:", err);
  });
} catch (err) {
  console.error("Init Error:", err);
}
