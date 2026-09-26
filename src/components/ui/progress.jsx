import React from 'react';

export const Progress = ({ value = 0, className = "" }) => (
  <div className={`relative h-1.5 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
    <div 
      className="h-full w-full flex-1 bg-primary transition-all duration-500" 
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} 
    />
  </div>
);
