import { motion } from "framer-motion";

interface WelcomeProps {
  userName: string;
  onStart: () => void;
}

export function Welcome({ userName, onStart }: WelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h2 className="text-2xl mb-4">
        Welcome {userName ? `back, ${userName}` : "Seeker"}
      </h2>
      <p className="text-purple-200 mb-6">
        Are you ready to explore the mysteries of the tarot?
      </p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Begin Reading
      </button>
    </motion.div>
  );
}
