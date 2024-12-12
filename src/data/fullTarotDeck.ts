import { TarotCard } from "../types/tarot";
import { createMajorArcana, createSuit } from "./cardFactory";
import { majorArcanaData } from "./majorArcanaData";
import {
  cupsData,
  pentaclesData,
  swordsData,
  wandsData,
} from "./minorArcanaData";

// Minor Arcana suits
const cupsSuit = createSuit(
  "cups",
  cupsData,
  "https://your-image-host.com/cups/[N].jpg",
);

const swordsSuit = createSuit(
  "swords",
  swordsData,
  "https://your-image-host.com/swords/[N].jpg",
);

const wandsSuit = createSuit(
  "wands",
  wandsData,
  "https://your-image-host.com/wands/[N].jpg",
);

const pentaclesSuit = createSuit(
  "pentacles",
  pentaclesData,
  "https://your-image-host.com/pentacles/[N].jpg",
);

// Major Arcana
const majorArcana = createMajorArcana(
  majorArcanaData,
  "https://your-image-host.com/major/[N].jpg",
);

export const fullTarotDeck: TarotCard[] = [
  ...majorArcana,
  ...wandsSuit,
  ...cupsSuit,
  ...swordsSuit,
  ...pentaclesSuit,
];
