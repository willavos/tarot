import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
});

// API endpoint for LLM (use Groq)
app.post("/api/interpret-reading", async (req, res) => {
  try {
    const { system, prompt } = req.body;

    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      // model: "llama3-8b-8192",
      model: "llama-3.3-70b-versatile",
    });

    console.log("prompt", prompt);

    res.json({ interpretation: completion.choices[0].message?.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing your request" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
