import { forwardRef, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import soundManager from '../services/soundManager';

// Utility to merge Tailwind classes
const cn = (...inputs: any[]) => twMerge(clsx(inputs));

// Define the props for the button
interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// The button component
const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ children, variant = 'primary', className, onClick, ...props }, ref) => {
    // Base classes for the button
    const baseClasses =
      'relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white uppercase tracking-wider overflow-hidden rounded-full transition-all duration-300 group';

    // Classes for different variants
    const variantClasses = {
      primary:
        'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500',
      secondary:
        'bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 focus:ring-blue-500',
    };

    // Animation variants for the button
    const buttonVariants = {
      initial: { scale: 1, boxShadow: '0 0 0px rgba(0, 0, 0, 0)' },
      hover: {
        scale: 1.05,
        boxShadow:
          variant === 'primary'
            ? '0 0 30px rgba(147, 51, 234, 0.6)'
            : '0 0 30px rgba(59, 130, 246, 0.6)',
        transition: { duration: 0.3 },
      },
      tap: { scale: 0.95, transition: { duration: 0.2 } },
    };

    // Handle click with sound
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      soundManager.play('click');
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={handleClick}
        onMouseEnter={() => soundManager.play('hover')}
        {...props}
      >
        {/* Shiny effect on hover */}
        <span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
          aria-hidden="true"
        />
        {/* Text and icon */}
        <span className="relative z-10 flex items-center">
          {children}
          {variant === 'primary' && (
            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </motion.button>
    );
  }
);

CtaButton.displayName = 'CtaButton';
export default CtaButton;
