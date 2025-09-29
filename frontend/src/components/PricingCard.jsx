import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Crown, Zap, Building } from "lucide-react";
import { THEME_COLORS, ANIMATIONS } from "../constants";

const planConfig = {
  Basic: {
    gradient: THEME_COLORS.gradients.card.basic,
    icon: Zap,
    popular: false,
    buttonText: "Get Started"
  },
  Pro: {
    gradient: THEME_COLORS.gradients.card.pro,
    icon: Crown,
    popular: true,
    buttonText: "Start Pro Trial"
  },
  Enterprise: {
    gradient: THEME_COLORS.gradients.card.enterprise,
    icon: Building,
    popular: false,
    buttonText: "Contact Sales"
  }
};

const PricingCard = ({ plan, index }) => {
  const config = planConfig[plan.name] || {
    gradient: THEME_COLORS.gradients.card.default,
    icon: Zap,
    popular: false,
    buttonText: "Get Started"
  };

  const IconComponent = config.icon;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {config.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.1 }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            ⭐ Most Popular
          </div>
        </motion.div>
      )}

      <motion.div
        className={`p-8 rounded-3xl shadow-2xl text-white bg-gradient-to-br ${config.gradient} relative overflow-hidden border ${config.popular ? 'border-yellow-400/50' : 'border-white/10'}`}
        whileHover={ANIMATIONS.card.hover}
        transition={ANIMATIONS.card.transition}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <IconComponent size={32} className="text-white/90" />
            </motion.div>
            <h2 className="text-2xl font-bold">{plan.name}</h2>
          </div>

          {/* Price */}
          <div className="mb-8">
            <motion.p 
              className="text-5xl font-extrabold mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ${plan.price}
              <span className="text-lg font-medium text-white/80">/month</span>
            </motion.p>
            {plan.description && (
              <p className="text-white/80 text-sm">{plan.description}</p>
            )}
          </div>

          {/* Features */}
          <motion.ul 
            className="space-y-4 mb-8"
            variants={ANIMATIONS.stagger.container}
            initial="initial"
            animate="animate"
          >
            {plan.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 text-white/90 group"
                variants={ANIMATIONS.stagger.item}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle 
                  size={20} 
                  className="text-green-300 mt-0.5 group-hover:text-green-200 transition-colors flex-shrink-0" 
                />
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.button
            whileHover={ANIMATIONS.button.hover}
            whileTap={ANIMATIONS.button.tap}
            className={`w-full py-4 font-semibold rounded-2xl shadow-xl transition-all duration-300 ${
              config.popular 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-yellow-400/30' 
                : 'bg-white text-black hover:bg-gray-100'
            } hover:shadow-2xl`}
          >
            <span className="flex items-center justify-center gap-2">
              {config.buttonText}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PricingCard;
