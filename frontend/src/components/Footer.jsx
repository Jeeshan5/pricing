import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Heart } from "lucide-react";
import { THEME_COLORS, ANIMATIONS } from "../constants";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "rgba(255,255,255,0.1)"
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon size={20} className={color} />
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <motion.p 
        className="text-lg font-bold text-white"
        key={value} // Re-animate when value changes
        initial={{ scale: 1.2, color: "#ffffff" }}
        animate={{ scale: 1, color: "#ffffff" }}
        transition={{ duration: 0.3 }}
      >
        {value.toLocaleString()}
      </motion.p>
    </div>
  </motion.div>
);

const Footer = ({ stats, error }) => {
  return (
    <motion.footer 
      className="mt-20 w-full max-w-6xl mx-auto px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {/* Stats Section */}
      <div className="mb-8">
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TrendingUp className="text-purple-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Live Analytics</h3>
        </motion.div>

        {error ? (
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-400 text-sm">Unable to load stats</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            variants={ANIMATIONS.stagger.container}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={ANIMATIONS.stagger.item}>
              <StatCard
                icon={BarChart3}
                label="Total Requests"
                value={stats.totalRequests}
                color="text-blue-400"
              />
            </motion.div>
            <motion.div variants={ANIMATIONS.stagger.item}>
              <StatCard
                icon={Users}
                label="Blue Requests"
                value={stats.blue}
                color="text-indigo-400"
              />
            </motion.div>
            <motion.div variants={ANIMATIONS.stagger.item}>
              <StatCard
                icon={Users}
                label="Green Requests"
                value={stats.green}
                color="text-emerald-400"
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Copyright Section */}
      <motion.div 
        className="text-center border-t border-gray-700/50 pt-8 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.p 
          className="text-gray-400 text-sm flex items-center justify-center gap-2"
          whileHover={{ color: "#ffffff" }}
          transition={{ duration: 0.2 }}
        >
          © {new Date().getFullYear()} Premium Pricing UI • Made with 
          <motion.span
            animate={{ 
              scale: [1, 1.2, 1],
              color: ["#ef4444", "#f97316", "#ef4444"]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.span>
          by our team
        </motion.p>
        <motion.p 
          className="text-xs text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Real-time data updates every 2 seconds
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;