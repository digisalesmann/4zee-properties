import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'purple' | 'gold' | 'green' | 'red' | 'blue' | 'dark' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'purple', size = 'sm', className }: BadgeProps) {
  const variants = {
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    gold: 'bg-amber-50 text-amber-700 border border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    red: 'bg-red-50 text-red-600 border border-red-200',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    dark: 'bg-gray-900 text-white border border-gray-700',
    outline: 'bg-transparent text-purple-700 border border-purple-400',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn('inline-flex items-center gap-1 font-semibold rounded-md', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
