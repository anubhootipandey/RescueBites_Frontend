import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
