import React from 'react';
import { BarChart3, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input, Avatar } from '../ui/input';

export const Navbar = ({ progressPercent, completedCount, totalModul }) => {
  return (
    <header className="sticky top-0 z-40 bg-muted/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-black shadow-sm shadow-primary/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white">STOCKBIT</span>
              <Badge variant="default" className="uppercase border-primary/30">Academy</Badge>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-border">
            <Button variant="secondary" size="sm" className="bg-secondary text-white border border-border">Modul Belajar</Button>
            <Button variant="ghost" size="sm">Keystats</Button>
            <Button variant="ghost" size="sm">Chartbit</Button>
            <Button variant="ghost" size="sm">Stream</Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-1.5 text-xs text-slate-400 w-48 lg:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <Input placeholder="Cari materi atau emiten..." className="border-none bg-transparent h-auto p-0 focus-visible:ring-0" />
            <kbd className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-card border border-border text-slate-400">⌘K</kbd>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-card border border-border px-3.5 py-1.5 rounded-lg text-xs">
            <div className="w-20"><Progress value={progressPercent} /></div>
            <span className="font-mono text-primary font-bold text-[11px]">{completedCount}/{totalModul} Selesai</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <Avatar fallback="AI" />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-200 leading-tight">Aldi Isza</div>
              <div className="text-[10px] text-primary font-semibold font-mono">STOCKBIT PRO</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
