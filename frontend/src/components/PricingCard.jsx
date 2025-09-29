import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const colors = {
  Basic: "from-blue-500 to-indigo-600",
  Pro: "from-purple-500 to-pink-600",
  Enterprise: "from-green-500 to-emerald-600",
};

const PricingCard = ({ plan }) => {
  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${
        colors[plan.name] || "from-gray-700 to-gray-900"
      }`}
      whileHover={{ scale: 1.07, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
      <p className="text-4xl font-extrabold mb-6">
        ${plan.price}
        <span className="text-lg font-medium">/month</span>
      </p>

      <ul className="space-y-3">
        {plan.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 text-white/90 hover:text-white transition"
          >
            <CheckCircle size={20} className="text-green-300" />
            {feature}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-100 transition"
      >
        {plan.name === "Enterprise" ? "Contact Sales →" : "Get Started →"}
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;
