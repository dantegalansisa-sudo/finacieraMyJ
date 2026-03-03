import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}

const FloatingCard = ({ children, style, delay = 0 }: FloatingCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 0.6,
      delay: delay,
      ease: [0.16, 1, 0.3, 1] as const,
    }}
    style={{
      position: 'absolute',
      background: 'white',
      borderRadius: '20px',
      padding: '16px 20px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
      border: '1px solid rgba(0,0,0,0.04)',
      minWidth: '160px',
      animation: `float 4s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

export default FloatingCard;
