import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX, FiZap } from 'react-icons/fi';

interface CrazyToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  autoClose?: number;
}

// Particle component
const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full pointer-events-none"
    initial={{ opacity: 1, scale: 1 }}
    animate={{ 
      opacity: 0, 
      scale: 0,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotate: Math.random() * 360,
    }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
  />
);

const CrazyToast: React.FC<CrazyToastProps> = ({ message, type, onClose, autoClose = 3000 }) => {
  useEffect(() => {
    if (!autoClose) return;
    // prefer explicit onClose if provided (react-toastify may pass a close function)
    if (onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }

    // if no onClose provided, fallback to dismissing the toast container after timeout
    const timer = setTimeout(() => {
      try {
        toast.dismiss();
      } catch (e) {
        // ignore
      }
    }, autoClose);
    return () => clearTimeout(timer);
  }, [autoClose, onClose]);

  const typeConfig = {
    success: {
      colors: { primary: '#00D0A6', secondary: '#009d80', accent: 'rgba(0, 208, 166, 0.2)' },
      icon: <FiCheckCircle className="w-6 h-6" />,
      borderColor: 'border-[#00D0A6]',
      particleColor: '#00D0A6',
      glowColor: 'rgba(0, 208, 166, 0.5)',
    },
    error: {
      colors: { primary: '#ff6b6b', secondary: '#ff5252', accent: 'rgba(255, 107, 107, 0.2)' },
      icon: <FiAlertCircle className="w-6 h-6" />,
      borderColor: 'border-[#ff6b6b]',
      particleColor: '#ff6b6b',
      glowColor: 'rgba(255, 107, 107, 0.5)',
    },
    info: {
      colors: { primary: '#5B8CFF', secondary: '#4b77e6', accent: 'rgba(91, 140, 255, 0.2)' },
      icon: <FiInfo className="w-6 h-6" />,
      borderColor: 'border-[#5B8CFF]',
      particleColor: '#5B8CFF',
      glowColor: 'rgba(91, 140, 255, 0.5)',
    },
    warning: {
      colors: { primary: '#ffa500', secondary: '#ff9100', accent: 'rgba(255, 165, 0, 0.2)' },
      icon: <FiAlertTriangle className="w-6 h-6" />,
      borderColor: 'border-[#ffa500]',
      particleColor: '#ffa500',
      glowColor: 'rgba(255, 165, 0, 0.5)',
    },
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: -50, rotate: -20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.3, 
        y: -50, 
        rotate: 20,
        transition: { duration: 0.3 }
      }}
      whileHover={{ scale: 1.05 }}
      className={`
        relative overflow-hidden
        rounded-2xl p-4
        border-2 ${config.borderColor}
        backdrop-blur-xl
        max-w-md
        shadow-2xl
      `}
      style={{
        background: `linear-gradient(135deg, ${config.colors.accent}, rgba(7, 20, 38, 0.8))`,
        boxShadow: `0 0 40px ${config.glowColor}, 0 0 80px ${config.glowColor}80`,
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, ${config.colors.primary}, ${config.colors.secondary})`,
        }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Particles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ color: config.particleColor }}>
          <Particle delay={i * 0.1} />
        </div>
      ))}

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Icon */}
        <motion.div
          className="shrink-0 rounded-full p-3 flex items-center justify-center"
          style={{ 
            background: config.colors.accent,
            color: config.colors.primary,
            boxShadow: `0 0 20px ${config.glowColor}`,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {config.icon}
        </motion.div>

        {/* Message */}
        <motion.div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white jaro-font leading-snug">
            {message}
          </p>
        </motion.div>

        {/* Close Button */}
        {onClose && (
          <motion.button
            onClick={onClose}
            className="shrink-0 rounded-full p-2 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-5 h-5 text-white/70" />
          </motion.button>
        )}
      </motion.div>

      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${config.colors.primary}`,
          opacity: 0.3,
        }}
        animate={{ 
          boxShadow: [
            `inset 0 0 20px ${config.glowColor}`,
            `inset 0 0 40px ${config.glowColor}`,
            `inset 0 0 20px ${config.glowColor}`,
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Lightning Effect (only for error) */}
      {type === 'error' && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${config.colors.primary}, transparent)` }}
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
        />
      )}

      {/* Success Checkmark Animation */}
      {type === 'success' && (
        <motion.div
          className="absolute bottom-2 right-2 text-[#00D0A6]/30"
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiZap className="w-8 h-8" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CrazyToast;
