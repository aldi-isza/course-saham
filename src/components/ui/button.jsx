import React from 'react';

export const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";
  
  const variants = {
    default: "bg-primary text-primary-foreground font-bold hover:bg-primary-hover shadow-sm shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-accent hover:text-white border border-border",
    outline: "border border-border bg-transparent text-slate-200 hover:bg-secondary hover:text-white",
    ghost: "hover:bg-secondary text-slate-300 hover:text-white",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizes = {
    default: "h-9 px-4 py-2 text-xs",
    sm: "h-8 px-3 text-[11px]",
    lg: "h-11 px-6 text-sm",
    icon: "h-9 w-9 p-0 flex items-center justify-center",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
