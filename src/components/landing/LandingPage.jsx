import React from 'react';
import { 
  Play, 
  ArrowRight, 
  Lock, 
  BarChart2, 
  TrendingUp, 
  Layers, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export const LandingPage = ({ onEnterCourse, onOpenAdmin, totalLessons = 46, totalAssignments = 12 }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. APPLE GLASS NAVBAR */}
      <header className="apple-glass border-b border-border/60 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/25">
              <BarChart2 className="w-4 h-4 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight text-foreground flex items-center gap-2">
                Stockbit Academy
                <Badge variant="outline" className="text-[9px] uppercase font-mono py-0 px-1.5 border-primary/30 text-primary">Pro</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground hidden sm:block font-medium">Systematic Technical Analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onOpenAdmin}
              className="text-xs font-medium gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Button>
            <Button 
              size="sm" 
              onClick={onEnterCourse}
              className="text-xs font-semibold gap-1.5 bg-primary text-white hover:opacity-95 shadow-sm"
            >
              <span>Launch Classroom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Institutional Price Action Framework</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
            Systematic technical analysis for serious equity traders.
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            46 modular video masterclasses, practical worksheets, and verified price action rules with zero guesswork.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button 
              size="lg" 
              onClick={onEnterCourse}
              className="font-semibold text-xs sm:text-sm px-6 py-5 gap-2 bg-primary text-white hover:opacity-95 shadow-md shadow-primary/20"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Learning ({totalLessons} Modules)</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onOpenAdmin}
              className="font-medium text-xs sm:text-sm px-5 py-5 gap-2 border-border/70 hover:bg-muted"
            >
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Content Manager</span>
            </Button>
          </div>

          {/* Social Proof Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground font-mono">46</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-1">Masterclasses</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-primary font-mono">{totalAssignments}</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-1">Worksheets</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground font-mono">6</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-1">Levels</div>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-primary font-mono">100%</div>
              <div className="text-[11px] text-muted-foreground font-medium mt-1">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO CURRICULUM ROADMAP */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-10 w-full">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Structured roadmap from foundation to mastery.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Linear progression designed to build verifiable execution confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <Card className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <Badge variant="secondary" className="text-[9px]">LEVEL 1 - 2</Badge>
                <h3 className="text-base font-semibold text-foreground">Market Mechanics & Filtering</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Understand auction market theory, liquidity pools, and screening rules for IDX30 and LQ45 equities.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-border/50 text-[11px] font-mono text-primary font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>10 Core Lessons</span>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <Badge variant="secondary" className="text-[9px]">LEVEL 3 - 4</Badge>
                <h3 className="text-base font-semibold text-foreground">Candlestick & Volume Spread</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Master price rejection signatures, Pinbar locations, Doji indecision extremes, and institutional volume absorption.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-border/50 text-[11px] font-mono text-primary font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>16 Core Lessons</span>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <Badge variant="secondary" className="text-[9px]">LEVEL 5 - 6</Badge>
                <h3 className="text-base font-semibold text-foreground">Execution Strategy & Live Zoom</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Implement high-momentum breakout entries, structural retests, and interactive live mentoring case studies.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-border/50 text-[11px] font-mono text-primary font-semibold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>20 Advanced Lessons</span>
            </div>
          </Card>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Ready to elevate your trading edge?</h3>
            <p className="text-xs text-muted-foreground">Free self-paced access with automatic progress sync.</p>
          </div>
          <Button 
            size="lg" 
            onClick={onEnterCourse}
            className="font-semibold text-xs sm:text-sm px-6 py-5 gap-2 bg-primary text-white hover:opacity-95 shadow-sm shrink-0"
          >
            <span>Enter Classroom</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="mt-auto border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Stockbit Academy · Basic Technical Analysis (BTA)</span>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={onOpenAdmin} className="hover:text-foreground transition-colors">Admin Mode</button>
            <button onClick={onEnterCourse} className="hover:text-foreground transition-colors">Curriculum</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
