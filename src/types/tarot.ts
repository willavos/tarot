export interface TarotCard {
  name: string;
  nameNoSuit: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
  reversed?: boolean;
}
