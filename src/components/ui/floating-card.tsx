import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'neon';
  size?: 'sm' | 'md' | 'lg';
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  variant = 'glass',
  size = 'md',
  ...props
}) => {
  const variants = {
    default: 'bg-background border border-border',
    glass: 'glass-card',
    neon: 'glass-card ring-1 ring-accent/50 shadow-glow'
  };

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={cn(
        'rounded-2xl backdrop-blur-md transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};