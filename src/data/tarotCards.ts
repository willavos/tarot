export interface TarotCard {
  name: string;
  image: string;
  meaning: string;
  description: string;
}

export const tarotDeck: TarotCard[] = [
  {
    name: "The Fool",
    image: "https://picsum.photos/800",
    meaning: "New beginnings, innocence, spontaneity",
    description:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
  },
  {
    name: "The Magician",
    image: "https://picsum.photos/800",
    meaning: "Manifestation, resourcefulness, power",
    description:
      "The Magician represents manifestation, resourcefulness, power, inspired action, and using your skills and abilities to create success.",
  },
  {
    name: "The High Priestess",
    image: "https://picsum.photos/800",
    meaning: "Intuition, mystery, spirituality",
    description:
      "The High Priestess represents intuition, sacred knowledge, divine feminine, the subconscious mind, and trusting your inner voice.",
  },
  // Add more cards as needed
];
