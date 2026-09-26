import React from 'react';

export const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-xl ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-5 border-b border-border/60 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-base font-bold tracking-tight text-white ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-xs text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);
