import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import type { TarotCard } from "../types/tarot";

interface TarotSpreadProps {
  deck: TarotCard[];
  onCardClick: (index: number) => void;
  drawnPositions: number[];
  maxCards: number;
}

export const TarotSpread: React.FC<TarotSpreadProps> = ({
  deck,
  onCardClick,
  drawnPositions,
  maxCards,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window dimensions when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate random offsets once and never change them
  const randomOffsets = useMemo(() => {
    return deck.map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random(),
      rotation: Math.random() * 360,
    }));
  }, [deck]);

  // Calculate final positions based on random offsets and window size
  const cardPositions = useMemo(() => {
    return deck.map((_, index) => {
      const centerX = windowSize.width * 0.5;
      const centerY = windowSize.height * 0.4;
      const spreadRadius = Math.min(windowSize.width * 0.3, 300);
      const spreadAspectRatio = windowSize.width / windowSize.height;

      const offset = randomOffsets[index];
      const x =
        Math.cos(offset.angle) *
        (offset.radius * spreadRadius * spreadAspectRatio);
      const y = Math.sin(offset.angle) * (offset.radius * spreadRadius);

      return {
        x: centerX + x - 64 - 32,
        y: centerY + y,
        rotation: offset.rotation,
      };
    });
  }, [deck, windowSize, randomOffsets]);

  const getReadingPosition = (index: number) => {
    const baseX = windowSize.width * 0.5;
    // const baseY = window.innerHeight * 0.8;
    const spacing = 180; // Space between cards in reading
    const offset = drawnPositions.length * spacing * -0.5;
    const position = drawnPositions.indexOf(index);

    return {
      x: baseX + offset + position * spacing,
      y: 0,
      rotation: deck[index] ? 180 : 0,
    };
  };

  return (
    <motion.div
      className="relative min-h-[70vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {deck.map((card, index) => {
        const isDrawn = drawnPositions.includes(index);
        const position = isDrawn
          ? getReadingPosition(index)
          : cardPositions[index];

        if (drawnPositions.length === maxCards && !isDrawn) {
          return null;
        }

        return (
          <motion.div
            key={`${card.name}-${index}`}
            className="absolute"
            animate={{
              x: position.x,
              y: position.y,
              rotate: position.rotation,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: 1,
              scale: 1,
            }}
            initial={{ opacity: 0, scale: 0 }}
            transition={{ delay: index * 0.01 }}
            layout
          >
            <Card
              card={card}
              isFlipped={isDrawn}
              onClick={() => !isDrawn && onCardClick(index)}
              index={index}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
