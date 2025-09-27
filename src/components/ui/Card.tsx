import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClassName = `
    bg-white rounded-lg border border-gray-200 shadow-sm
    ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02 } : {}}
        onClick={onClick}
        className={baseClassName}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div onClick={onClick} className={baseClassName}>
      {children}
    </div>
  );
}
