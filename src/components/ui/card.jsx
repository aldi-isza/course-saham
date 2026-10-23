import React from 'react';

export const Card = ({ className = "", children, ...props }) => (
  <div 
    className={`rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-all duration-200 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-5 sm:p-6 border-b border-border/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-base font-semibold tracking-tight text-foreground ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-xs text-muted-foreground leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);
