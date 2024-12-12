import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import type { TarotCard } from '../types/tarot';

interface TarotSpreadProps {
  deck: TarotCard[];
  onCardClick: (index: number) => void;
  drawnPositions: number[];
}

export const TarotSpread: React.FC<TarotSpreadProps> = ({ deck, onCardClick, drawnPositions }) => {
  return (
    <motion.div 
      className="relative min-h-[70vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {deck.map((card, index) => {
        // Random position within a central area
        const centerX = window.innerWidth * 0.5;
        const centerY = window.innerHeight * 0.4;
        const spreadRadius = Math.min(window.innerWidth * 0.3, 300);
        
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = Math.random() * spreadRadius;
        const x = Math.cos(randomAngle) * randomRadius;
        const y = Math.sin(randomAngle) * randomRadius;
        
        const rotation = Math.random() * 360;

        return (
          <motion.div
            key={`${card.name}-${index}`}
            className="absolute"
            style={{
              left: centerX,
              top: centerY,
              x: x - 64, // Half card width
              y: y - 96, // Half card height
              rotate: rotation,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01 }}
            layout
          >
            <Card
              card={card}
              isFlipped={drawnPositions.includes(index)}
              onClick={() => onCardClick(index)}
              index={index}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};