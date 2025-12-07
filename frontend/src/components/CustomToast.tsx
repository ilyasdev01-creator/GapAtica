import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

interface CustomToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, onClose }) => {
  const typeConfig = {
    success: {
      bgGradient: 'from-[#00D0A6]/10 to-[#009d80]/5',
      borderColor: 'border-[#00D0A6]',
      textColor: 'text-[#00D0A6]',
      icon: <FiCheckCircle className="w-5 h-5" />,
      accentBg: 'bg-[#00D0A6]/20',
    },
    error: {
      bgGradient: 'from-[#ff6b6b]/10 to-[#ff5252]/5',
      borderColor: 'border-[#ff6b6b]',
      textColor: 'text-[#ff6b6b]',
      icon: <FiAlertCircle className="w-5 h-5" />,
      accentBg: 'bg-[#ff6b6b]/20',
    },
    info: {
      bgGradient: 'from-[#5B8CFF]/10 to-[#4b77e6]/5',
      borderColor: 'border-[#5B8CFF]',
      textColor: 'text-[#5B8CFF]',
      icon: <FiInfo className="w-5 h-5" />,
      accentBg: 'bg-[#5B8CFF]/20',
    },
    warning: {
      bgGradient: 'from-[#ffa500]/10 to-[#ff9100]/5',
      borderColor: 'border-[#ffa500]',
      textColor: 'text-[#ffa500]',
      icon: <FiAlertTriangle className="w-5 h-5" />,
      accentBg: 'bg-[#ffa500]/20',
    },
  };

  const config = typeConfig[type];

  return (
    <div className={`
      bg-linear-to-r ${config.bgGradient} 
      border-l-4 ${config.borderColor}
      rounded-lg p-4 pr-6 
      shadow-lg backdrop-blur-sm 
      flex items-center gap-3 
      max-w-sm
      animate-slide-in
    `}>
      {/* Icon Container */}
      <div className={`shrink-0 ${config.textColor} ${config.accentBg} p-2 rounded-full`}>
        {config.icon}
      </div>

      {/* Message */}
      <p className="text-sm font-medium text-white flex-1 jaro-font">
        {message}
      </p>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default CustomToast;
