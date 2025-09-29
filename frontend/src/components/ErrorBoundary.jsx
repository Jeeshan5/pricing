import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorBoundary = ({ 
  error, 
  onRetry, 
  title = "Oops! Something went wrong", 
  description = "We encountered an error while loading the content." 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black text-white p-8">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-6"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <AlertTriangle size={80} className="mx-auto text-red-400" />
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4 text-red-300">
          {title}
        </h1>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>
        
        {error && (
          <motion.div
            className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-red-200 font-mono">
              {error}
            </p>
          </motion.div>
        )}
        
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} />
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorBoundary;