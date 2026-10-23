import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { CourseDashboard } from './components/course/CourseDashboard';
import { LandingPage } from './components/landing/LandingPage';
import { AdminCMS } from './components/admin/AdminCMS';
import { INITIAL_CURRICULUM } from './data/curriculumData';
import { BTA_ASSIGNMENTS } from './data/assignmentData';

function App() {
  // Navigation view: 'landing' | 'course' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('bta_current_view') || 'landing';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('bta_course_theme') || 'dark';
  });

  // Local state for Curriculum & Assignments (Local DB)
  const [curriculum, setCurriculum] = useState(() => {
    try {
      const saved = localStorage.getItem('bta_local_curriculum');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CURRICULUM;
  });

  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('bta_local_assignments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return BTA_ASSIGNMENTS;
  });

  const [progressState, setProgressState] = useState({
    percent: 0,
    completed: 0,
    total: 46
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('bta_course_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    localStorage.setItem('bta_current_view', view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin persistence callbacks
  const handleSaveCurriculum = (newCurriculum) => {
    setCurriculum(newCurriculum);
    localStorage.setItem('bta_local_curriculum', JSON.stringify(newCurriculum));
  };

  const handleSaveAssignments = (newAssignments) => {
    setAssignments(newAssignments);
    localStorage.setItem('bta_local_assignments', JSON.stringify(newAssignments));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all modules and assignments back to factory default?')) {
      setCurriculum(INITIAL_CURRICULUM);
      setAssignments(BTA_ASSIGNMENTS);
      localStorage.removeItem('bta_local_curriculum');
      localStorage.removeItem('bta_local_assignments');
      alert('Database restored to default.');
    }
  };

  const handleProgressUpdate = useCallback((percent, completed, total) => {
    setProgressState(prev => {
      if (prev.percent === percent && prev.completed === completed && prev.total === total) {
        return prev;
      }
      return { percent, completed, total };
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      {/* 1. ADMIN CMS VIEW */}
      {currentView === 'admin' && (
        <AdminCMS 
          curriculum={curriculum}
          assignments={assignments}
          onSaveCurriculum={handleSaveCurriculum}
          onSaveAssignments={handleSaveAssignments}
          onClose={() => handleNavigate('course')}
          onResetToDefaults={handleResetToDefaults}
        />
      )}

      {/* 2. LANDING PAGE VIEW */}
      {currentView === 'landing' && (
        <LandingPage 
          onEnterCourse={() => handleNavigate('course')}
          onOpenAdmin={() => handleNavigate('admin')}
          totalLessons={curriculum.length}
          totalAssignments={assignments.length}
        />
      )}

      {/* 3. COURSE DASHBOARD VIEW */}
      {currentView === 'course' && (
        <>
          <Navbar 
            progressPercent={progressState.percent} 
            completedCount={progressState.completed} 
            totalModul={progressState.total} 
            theme={theme}
            onToggleTheme={toggleTheme}
            onGoHome={() => handleNavigate('landing')}
            onOpenAdmin={() => handleNavigate('admin')}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
            <CourseDashboard 
              curriculum={curriculum}
              assignments={assignments}
              onProgressUpdate={handleProgressUpdate} 
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
