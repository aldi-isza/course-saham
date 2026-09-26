import React from 'react';

export const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-9 w-full rounded-lg border border-border bg-muted px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

export const Avatar = ({ fallback = "AI", className = "" }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-primary/15 border border-primary/30 items-center justify-center font-bold text-xs text-primary ${className}`}>
    {fallback}
  </div>
);
