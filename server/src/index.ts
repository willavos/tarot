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

// API endpoint for interpreting a tarot reading (fundamentally hitting Groq API)
app.post("/api/interpret-reading", async (req, res) => {
  const { system, prompt } = req.body;

  const completion = await client.chat.completions
    .create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      // model: "llama3-8b-8192", // higher token limit, but we don't need it, we're limited on requests
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
    })
    .catch(async (err) => {
      if (err instanceof Groq.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
      } else {
        console.error(err);
        throw err;
      }
    });

  if (!completion) {
    res.status(500).json({ error: "Error processing your request" });
    return;
  }

  res.json({ interpretation: completion.choices[0].message?.content });
});

// API endpoint for interpreting a tarot reading (fundamentally hitting Groq API)
app.post("/api/interpret-reading-stream", async (req, res) => {
  const { system, prompt } = req.body;

  const completion = await client.chat.completions
    .create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      // model: "llama3-8b-8192", // higher token limit, but we don't need it, we're limited on requests
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
    })
    .catch(async (err) => {
      if (err instanceof Groq.APIError) {
        console.log(err.status); // 400
        console.log(err.name); // BadRequestError
        console.log(err.headers); // {server: 'nginx', ...}
      } else {
        console.error(err);
        throw err;
      }
    });

  if (!completion) {
    res.status(500).json({ error: "Error processing your request" });
    return;
  }

  try {
    for await (const chunk of completion) {
      if (!chunk) return; // end of stream
      const fr = chunk.choices[0].finish_reason;
      if (fr) return;
      const delta = chunk.choices[0].delta;

      const content = delta.content || "";
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing your request" });
  } finally {
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
