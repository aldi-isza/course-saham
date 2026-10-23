import React from 'react';

export const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-primary/15 text-primary border-primary/25",
    secondary: "bg-secondary text-secondary-foreground border-border/60",
    outline: "text-muted-foreground border-border/70 bg-transparent",
    destructive: "bg-destructive/15 text-destructive border-destructive/25",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold transition-colors ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
