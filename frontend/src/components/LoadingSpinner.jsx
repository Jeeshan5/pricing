import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <motion.div
        className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {message}
      </motion.p>
      <motion.div
        className="flex space-x-2 mt-4"
        initial="start"
        animate="end"
        variants={{
          start: { opacity: 0.3 },
          end: { opacity: 1 }
        }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;