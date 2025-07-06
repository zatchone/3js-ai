import React from 'react';
import { motion } from 'framer-motion';
import state from '../store';
import { useSnapshot } from 'valtio';

const CustomButton = ({ type, title, customStyles, handleClick, icon }) => {
  const snap = useSnapshot(state);
  
  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color,
          color: '#fff',
          border: 'none',
        };
      case 'outline':
        return {
          borderWidth: '2px',
          borderColor: snap.color,
          color: snap.color,
          background: 'transparent',
        };
      case 'neo':
        return {
          background: 'linear-gradient(145deg, #8b5cf6, #7c3aed)',
          border: 'none',
          borderRadius: '16px',
          color: 'white',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(138, 43, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        };
      default:
        return {
          backgroundColor: snap.color,
          color: '#fff',
          border: 'none',
        };
    }
  };

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95, 
      y: 0,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 0.5 } }
  };

  return (
    <motion.button
      className={`px-4 py-2 flex-1 rounded-md border-none outline-none cursor-pointer font-bold text-sm transition-all duration-300 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <motion.div variants={iconVariants}>
            {icon}
          </motion.div>
        )}
        {title}
      </div>
      
      {type === 'neo' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          style={{ left: '-100%' }}
          whileHover={{ left: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

export default CustomButton;