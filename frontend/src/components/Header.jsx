import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Tag } from "lucide-react";
import { THEME_COLORS, ANIMATIONS } from "../constants";

const Header = ({ version }) => {
  return (
    <motion.header 
      className={`w-full px-8 py-8 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r ${THEME_COLORS.gradients.header} shadow-2xl backdrop-blur-sm`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-3 mb-4 sm:mb-0"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <Sparkles className="text-yellow-300" size={32} />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-2xl tracking-wide bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
          Premium Pricing
        </h1>
      </motion.div>
      
      <motion.div
        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white/95 backdrop-blur-sm text-gray-800 rounded-full shadow-xl border border-white/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
        }}
      >
        <Tag size={16} className="text-purple-600" />
        <span>Version {version}</span>
      </motion.div>
    </motion.header>
  );
};

export default Header;
