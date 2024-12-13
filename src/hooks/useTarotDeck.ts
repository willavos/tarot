import { useState, useCallback } from "react";
import { TarotCard } from "../types/tarot";
import { shuffleArray } from "../utils/arrayUtils";
import { fullTarotDeck } from "../data/fullTarotDeck";

interface DrawnCard extends TarotCard {
  position: number;
}

export const useTarotDeck = () => {
  const [deck, setDeck] = useState<TarotCard[]>(() =>
    shuffleArray(fullTarotDeck),
  );
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [maxCards, setMaxCards] = useState<number>(3);
  const [question, setQuestion] = useState<string>("");
  const [isReadingStarted, setIsReadingStarted] = useState(false);

  const shuffleDeck = useCallback(() => {
    const reversedDeck = fullTarotDeck.map((card) => ({
      ...card,
      reversed: Math.random() < 0.5,
    }));
    setDeck(shuffleArray(reversedDeck));
    console.log("Deck shuffled", deck);
    setDrawnCards([]);
    setMaxCards(3);
    setQuestion("");
    setIsReadingStarted(false);
  }, []);

  const startReading = useCallback((newQuestion: string, cardCount: number) => {
    shuffleDeck();
    setQuestion(newQuestion);
    setMaxCards(cardCount);
    setIsReadingStarted(true);
    setDrawnCards([]);
  }, []);

  const drawCard = useCallback(
    (index: number) => {
      if (
        !isReadingStarted ||
        drawnCards.some((card) => card.position === index)
      )
        return;
      if (drawnCards.length >= maxCards) return;

      const card = deck[index];
      const isReversed = deck[index].reversed;

      setDrawnCards((prev) => [
        ...prev,
        {
          ...card,
          isReversed,
          position: index,
        },
      ]);
    },
    [deck, drawnCards, isReadingStarted, maxCards],
  );

  return {
    deck,
    drawnCards,
    drawCard,
    shuffleDeck,
    startReading,
    question,
    maxCards,
    isReadingStarted,
    isReadingComplete: maxCards !== null && drawnCards.length === maxCards,
  };
};
