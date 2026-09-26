import React, { useState } from 'react';
import { TopTicker } from './components/layout/TopTicker';
import { Navbar } from './components/layout/Navbar';
import { CourseDashboard } from './components/course/CourseDashboard';

function App() {
  const [progressState, setProgressState] = useState({
    percent: 25,
    completed: 2,
    total: 8
  });

  const handleProgressUpdate = (percent, completed, total) => {
    setProgressState({ percent, completed, total });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Running Market Ticker */}
      <TopTicker />

      {/* 2. Top Header Navbar */}
      <Navbar 
        progressPercent={progressState.percent} 
        completedCount={progressState.completed} 
        totalModul={progressState.total} 
      />

      {/* 3. Main Course Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        <CourseDashboard onProgressUpdate={handleProgressUpdate} />
      </main>
    </div>
  );
}

export default App;
