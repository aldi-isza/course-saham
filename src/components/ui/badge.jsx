import React from 'react';

export const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-border",
    outline: "text-slate-300 border-border bg-transparent",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-mono font-bold transition-colors ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
