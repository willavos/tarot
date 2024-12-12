export interface TarotCard {
  name: string;
  number?: number;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}