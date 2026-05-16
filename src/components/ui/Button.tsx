'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none overflow-hidden';

  const variants = {
    primary: 'bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 active:scale-95',
    secondary: 'bg-white hover:bg-gray-50 text-purple-900 border border-purple-200 hover:border-purple-400 shadow-sm active:scale-95',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white active:scale-95',
    ghost: 'text-purple-700 hover:bg-purple-50 active:scale-95',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-white shadow-lg shadow-amber-900/20 active:scale-95',
    dark: 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], disabled || loading ? 'opacity-60 cursor-not-allowed' : '', className)}
      disabled={disabled || loading}
      {...(props as object)}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && iconPosition === 'left' && icon
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
}
