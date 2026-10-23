import React from 'react';

export const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-9 w-full rounded-full border border-border/70 bg-muted/60 px-3.5 py-1 text-xs text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export const Avatar = ({ fallback = "AI", className = "" }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-primary/15 border border-primary/30 items-center justify-center font-bold text-xs text-primary shadow-sm ${className}`}>
    {fallback}
  </div>
);
