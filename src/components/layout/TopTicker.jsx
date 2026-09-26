import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TopTicker = () => {
  return (
    <div className="bg-[#090C12] border-b border-border text-xs overflow-hidden py-1.5 select-none">
      <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">IHSG</span><span className="text-slate-200">7,760.40</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.72%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">LQ45</span><span className="text-slate-200">982.15</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.55%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BBCA</span><span className="text-slate-200">10,500</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+1.45%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BBRI</span><span className="text-slate-200">5,225</span><span className="text-destructive font-semibold flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" />-0.48%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BMRI</span><span className="text-slate-200">7,175</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.70%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">TLKM</span><span className="text-slate-200">3,040</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.33%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">ASII</span><span className="text-slate-200">5,150</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+1.48%</span></div>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">IHSG</span><span className="text-slate-200">7,760.40</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.72%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BBCA</span><span className="text-slate-200">10,500</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+1.45%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BBRI</span><span className="text-slate-200">5,225</span><span className="text-destructive font-semibold flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" />-0.48%</span></div>
          <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">BMRI</span><span className="text-slate-200">7,175</span><span className="text-primary font-semibold flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />+0.70%</span></div>
        </div>
      </div>
    </div>
  );
};
