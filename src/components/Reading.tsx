import React, { useState } from "react";
import { motion } from "framer-motion";
import type { TarotCard } from "../types/tarot";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ReadingProps {
  drawnCards: Array<TarotCard>;
  isReadingComplete: boolean;
}

export const Reading: React.FC<ReadingProps> = ({
  drawnCards,
  isReadingComplete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (drawnCards.length === 0) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{
        y: isReadingComplete || isExpanded ? 0 : "calc(100% - 60px)",
      }}
      className="fixed bottom-0 left-0 w-full bg-purple-900 rounded-t-lg shadow-lg"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => !isReadingComplete && setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold text-white">
          Your Reading ({drawnCards.length} cards)
        </h2>
        {!isReadingComplete && (isExpanded ? <ChevronDown /> : <ChevronUp />)}
      </div>

      <div className="p-6 space-y-6">
        {drawnCards.map((card, index) => (
          <motion.div
            key={`${card.name}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-purple-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-white">{card.name}</h3>
              {card.reversed && (
                <span className="text-red-400 text-sm">(Reversed)</span>
              )}
            </div>
            <p className="text-purple-200 mb-2">
              {card.reversed ? card.reversedMeaning : card.uprightMeaning}
            </p>
            <p className="text-purple-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
