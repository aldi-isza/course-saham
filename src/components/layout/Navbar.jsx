import React from 'react';
import { BarChart2, Search, Sun, Moon, Home, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input, Avatar } from '../ui/input';

export const Navbar = ({ 
  progressPercent, 
  completedCount, 
  totalModul, 
  theme, 
  onToggleTheme,
  onGoHome,
  onOpenAdmin
}) => {
  return (
    <header className="sticky top-0 z-40 apple-glass border-b border-border/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2.5">
          {onGoHome && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onGoHome}
              title="Return to Home"
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground border border-border/50 hover:bg-muted"
            >
              <Home className="w-3.5 h-3.5" />
            </Button>
          )}

          <div onClick={onGoHome} className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/25">
              <BarChart2 className="w-4 h-4 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Stockbit Academy
                </span>
                <Badge variant="default" className="text-[9px] uppercase font-mono tracking-wider py-0 px-1.5 border-primary/25">
                  BTA
                </Badge>
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:inline leading-none font-medium">
                Systematic Technical Analysis
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Search, Theme, Progress, Profile */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 bg-muted/60 border border-border/60 rounded-full px-3.5 py-1 text-xs text-muted-foreground w-48 lg:w-56 focus-within:border-primary/50 transition">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input 
              placeholder="Search syllabus..." 
              className="border-none bg-transparent h-6 p-0 focus:outline-none text-foreground text-xs w-full placeholder:text-muted-foreground" 
            />
            <kbd className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-card border border-border/60 text-muted-foreground shrink-0">⌘K</kbd>
          </div>

          {/* Theme Toggle Button (Apple Minimalist Circle) */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="w-8 h-8 rounded-full border border-border/60 bg-card/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-foreground" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          {/* Admin CMS Button */}
          {onOpenAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex text-xs font-medium gap-1.5 border-border/70 hover:bg-muted"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Admin</span>
            </Button>
          )}

          {/* Apple Progress Capsule */}
          <div className="hidden sm:flex items-center gap-2.5 bg-muted/60 border border-border/60 px-3 py-1 rounded-full text-xs">
            <div className="w-16"><Progress value={progressPercent} /></div>
            <span className="font-mono text-primary font-semibold text-[11px] whitespace-nowrap">
              {completedCount}/{totalModul}
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1.5 sm:border-l border-border/50">
            <Avatar fallback="AI" className="w-7 h-7 text-[11px]" />
            <div className="hidden xl:block text-left leading-tight">
              <div className="text-xs font-semibold text-foreground">Aldi Isza</div>
              <div className="text-[9px] text-primary font-mono font-medium">Trader Pro</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
