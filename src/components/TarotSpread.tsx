import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import type { TarotCard } from "../types/tarot";

// interface CardPosition {
//   x: number;
//   y: number;
//   rotation: number;
// }

interface TarotSpreadProps {
  deck: TarotCard[];
  onCardClick: (index: number) => void;
  drawnPositions: number[];
}

export const TarotSpread: React.FC<TarotSpreadProps> = ({
  deck,
  onCardClick,
  drawnPositions,
  maxCards,
}) => {
  // Calculate card positions once and memoize them
  const cardPositions = useMemo(() => {
    return deck.map((card) => {
      const centerX = window.innerWidth * 0.5;
      const centerY = window.innerHeight * 0.4;
      const spreadRadius = Math.min(window.innerWidth * 0.3, 300);

      const randomAngle = Math.random() * Math.PI * 2;
      const randomRadius = Math.random() * spreadRadius;
      const x = Math.cos(randomAngle) * randomRadius;
      const y = Math.sin(randomAngle) * randomRadius;

      return {
        x: centerX + x - 64, // Half card width
        y: centerY + y - 96, // Half card height
        rotation: Math.random() * 360,
        inverted: card.reversed,
      };
    });
  }, []); // Empty dependency array means this only runs once

  const getReadingPosition = (index: number) => {
    const baseX = window.innerWidth * 0.5;
    // const baseY = window.innerHeight * 0.8;
    const spacing = 180; // Space between cards in reading
    const offset = (drawnPositions.length - 1) * spacing * -0.5;
    const position = drawnPositions.indexOf(index);

    return {
      x: baseX + offset + position * spacing - 64,
      y: 0,
      rotation: cardPositions[index].inverted ? 180 : 0,
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
          return <></>;
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
              isInverted={position.inverted}
              onClick={() => !isDrawn && onCardClick(index)}
              index={index}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
