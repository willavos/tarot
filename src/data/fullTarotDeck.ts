import { TarotCard } from '../types/tarot';
import { majorArcana } from './majorArcana';
import { wandsSuit } from './minorArcana/wands';
import { cupsSuit } from './minorArcana/cups';
import { swordsSuit } from './minorArcana/swords';
import { pentaclesSuit } from './minorArcana/pentacles';

export const fullTarotDeck: TarotCard[] = [
  ...majorArcana,
  ...wandsSuit,
  ...cupsSuit,
  ...swordsSuit,
  ...pentaclesSuit
];