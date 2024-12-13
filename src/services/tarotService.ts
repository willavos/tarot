import { UserInfo } from "../components/UserInfoForm";

const system = "You are a knowledgeable tarot reader providing interpretations";

const getPrompt = (
  cards: string[],
  question: string,
  userInfo: UserInfo | undefined,
) => {
  let userContext = "";
  if (userInfo) {
    const name = userInfo.name;
    const birthDate = userInfo.birthDate;
    const zodiacSign = userInfo.zodiacSign;
    const knowFuture = userInfo.knowFuture;
    const otherInfo = userInfo.otherInfo;

    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    userContext = `You are about to provide a tarot reading for ${name}, a ${age} year old ${zodiacSign}.
${name} is ${knowFuture ? "" : "not "}interested in knowing their future.
They also have shared some additional information, which they would like you to consider: "${otherInfo}".`;
  }

  return `You are an experienced tarot reader providing an in-depth reading.
${userContext}

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
DO NOT RAMBLE! Give a 500 word response. If you go over, you will be penalized.

Address the querent directly, and make sure you finish with a 'core message' , and guidane for the querent.`;
};

const theURL = "https://piss.dev";

export const interpretReading = async (
  cards: string[],
  question: string,
  userInfo: UserInfo | undefined,
) => {
  if (!question) {
    throw new Error("Question is required");
  }
  try {
    const response = await fetch(theURL + "/api/interpret-reading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system: system,
        prompt: getPrompt(cards, question, userInfo),
      }),
    });

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

export const interpretReadingStream = async function* (
  cards: string[],
  question: string,
  userInfo: UserInfo | undefined,
) {
  if (!question) {
    throw new Error("Question is required");
  }
  try {
    const response = await fetch(theURL + "/api/interpret-reading-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system: system,
        prompt: getPrompt(cards, question, userInfo),
      }),
    });

    if (!response.ok) {
      console.error("Error:", response.statusText);
      throw new Error("Error processing your request");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Convert the received chunks to text
      const chunk = new TextDecoder().decode(value);
      // Split by newlines in case multiple chunks arrived
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            // Remove 'data: ' prefix and parse JSON
            const jsonStr = line.replace("data: ", "");
            const jsonData = JSON.parse(jsonStr);

            // Yield just the content
            if (jsonData.content) {
              yield jsonData.content;
            }
          } catch (e) {
            // Skip invalid JSON
            console.warn("Failed to parse chunk:", line);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
