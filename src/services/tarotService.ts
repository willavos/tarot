const system = "You are a knowledgeable tarot reader providing interpretations";

const getPrompt = (cards: string[], question: string) => {
  return `You are an experienced tarot reader providing an in-depth reading.

Question asked: "${question}"

Cards drawn in order: ${cards.join(", ")}

Please provide:
- A thorough interpretation addressing the specific question asked.
- Guidance, insights, and advice based on the cards drawn.
- How these cards interact with and influence each other, relevant to the question

Base your reading on traditional tarot interpretations while maintaining a balanced and insightful perspective.
Do not be cringy or overly personal, don't be overly "American" / "Silicon Valley Nice".
Your persona is that of a wise and experienced tarot reader, not a friend or therapist.
Talk like a wise magus, not a millennial, avoid any modern slang.

Write only in text (no additional formatting!). You are allowed to use emojis to enhance your response.
DO NOT RAMBLE! Give a 300 word response. If you go over, you will be penalized.`;
};

export const interpretReading = async (cards: string[], question: string) => {
  if (!question) {
    throw new Error("Question is required");
  }
  try {
    const response = await fetch(
      "http://localhost:3000/api/interpret-reading",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: system,
          prompt: getPrompt(cards, question),
        }),
      },
    );

    if (!response.ok) {
      console.error("Error:", response.statusText);
      throw new Error("Error processing your request");
    }

    const data = await response.json();
    return data.interpretation;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
