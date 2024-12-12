import { TarotCard } from "../types/tarot";

type SuitType = "cups" | "wands" | "swords" | "pentacles";

interface CardData {
  name: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

export const createSuit = (
  suit: SuitType,
  cardData: Readonly<CardData[]>,
  imageUrlPattern: string,
): TarotCard[] => {
  return cardData.map((card, index) => ({
    name: `${card.name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    number: index + 1,
    arcana: "minor" as const,
    suit,
    // image: imageUrlPattern.replace("[N]", (index + 1).toString()),
    image: "https://picsum.photos/${800 + index}",
    uprightMeaning: card.uprightMeaning,
    reversedMeaning: card.reversedMeaning,
    description: card.description,
  }));
};

export const createMajorArcana = (
  cardData: Readonly<CardData>[],
  imageUrlPattern: string,
): TarotCard[] => {
  return cardData.map((card) => ({
    name: card.name,
    // number: card.number,
    arcana: "major" as const,
    // image: imageUrlPattern.replace("[N]", card.number.toString()),
    image: "https://picsum.photos/200/300",
    uprightMeaning: card.uprightMeaning,
    reversedMeaning: card.reversedMeaning,
    description: card.description,
  }));
};
