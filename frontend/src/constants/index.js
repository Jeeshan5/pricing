export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  ENDPOINTS: {
    PRICING: '/pricing',
    STATS: '/admin/stats'
  },
  POLLING_INTERVAL: 2000
};

export const THEME_COLORS = {
  gradients: {
    primary: 'from-indigo-900 via-purple-900 to-black',
    header: 'from-pink-500 via-purple-600 to-indigo-600',
    card: {
      basic: 'from-blue-500 to-indigo-600',
      pro: 'from-purple-500 to-pink-600',
      enterprise: 'from-green-500 to-emerald-600',
      default: 'from-gray-700 to-gray-900'
    },
    loading: 'from-indigo-900 via-purple-900 to-black',
    error: 'from-red-900 via-purple-900 to-black'
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    accent: 'text-purple-400',
    muted: 'text-gray-400'
  }
};

export const ANIMATIONS = {
  card: {
    hover: { scale: 1.07, rotateY: 5 },
    transition: { type: "spring", stiffness: 200, damping: 15 }
  },
  button: {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  stagger: {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  }
};