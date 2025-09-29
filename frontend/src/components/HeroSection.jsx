import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowDown } from 'lucide-react';
import { ANIMATIONS } from '../constants';

const HeroSection = ({ title, subtitle }) => {
  return (
    <motion.section 
      className="text-center py-16 px-8 max-w-4xl mx-auto"
      variants={ANIMATIONS.stagger.container}
      initial="initial"
      animate="animate"
    >
      <motion.div
        variants={ANIMATIONS.stagger.item}
        className="mb-6"
      >
        <motion.div
          className="flex justify-center gap-1 mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                repeatDelay: 3
              }}
            >
              <Star size={24} className="text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </motion.div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text leading-tight">
          {title || "Choose Your Perfect Plan"}
        </h1>
      </motion.div>

      <motion.p 
        variants={ANIMATIONS.stagger.item}
        className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
      >
        {subtitle || "Unlock premium features and take your experience to the next level with our carefully crafted pricing plans."}
      </motion.p>

      <motion.div
        variants={ANIMATIONS.stagger.item}
        className="flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-purple-400"
        >
          <ArrowDown size={32} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;