import React from 'react';

export const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]";
  
  const variants = {
    default: "bg-primary text-white font-semibold hover:opacity-95 shadow-sm shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/60",
    outline: "border border-border/70 bg-transparent text-foreground hover:bg-muted hover:border-border",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
    destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
  };

  const sizes = {
    default: "h-9 px-4 py-2 text-xs",
    sm: "h-8 px-3.5 text-[11px]",
    lg: "h-11 px-6 text-sm font-semibold",
    icon: "h-9 w-9 p-0 flex items-center justify-center rounded-full",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
