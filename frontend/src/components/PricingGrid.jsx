import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../constants';

const PricingGrid = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-8 w-full max-w-7xl mx-auto ${className}`}
      variants={ANIMATIONS.stagger.container}
      initial="initial"
      animate="animate"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={ANIMATIONS.stagger.item}
        >
          {React.cloneElement(child, { index })}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PricingGrid;