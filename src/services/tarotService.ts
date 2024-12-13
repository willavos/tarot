const getPrompt = (cards: string[], question: string) => {
  return `You are an experienced tarot reader providing an in-depth reading.

Question asked: "${question}"

Cards drawn in order: ${cards.join(", ")}

Please provide:
- A thorough interpretation addressing the specific question asked.
- Guidance, insights, and advice based on the cards drawn.
- How these cards interact with and influence each other, relevant to the question

Base your reading on traditional tarot interpretations while maintaining a balanced and insightful perspective.`;
};

export const interpretReading = async (cards: string[], question: string) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/interpret-reading",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: getPrompt(cards, question) }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.interpretation;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
