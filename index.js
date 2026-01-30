import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Validate API key
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not set in environment variables");
  process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GEMINI_MODEL = "gemini-1.5-flash";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// API endpoint for chat
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  
  try {
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    // Get the last user message
    const userMessage = messages[messages.length - 1]?.text;
    
    if (!userMessage) {
      return res.status(400).json({ error: "No user message provided" });
    }

    // Validate message length
    if (userMessage.length > 10000) {
      return res.status(400).json({ error: "Message is too long. Maximum 10000 characters allowed" });
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    // Generate content
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ result: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate response. Please try again." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
