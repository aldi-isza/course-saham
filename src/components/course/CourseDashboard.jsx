import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CloudSnow, 
  ListVideo, 
  Play, 
  FileText, 
  Download, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/input';
import { INITIAL_CURRICULUM } from '../../data/curriculumData';
import { BTA_ASSIGNMENTS } from '../../data/assignmentData';

export const CourseDashboard = ({ 
  curriculum: propCurriculum, 
  assignments: propAssignments,
  onProgressUpdate 
}) => {
  const [curriculum, setCurriculum] = useState(() => {
    return propCurriculum || INITIAL_CURRICULUM;
  });

  useEffect(() => {
    if (propCurriculum) {
      setCurriculum(propCurriculum);
    }
  }, [propCurriculum]);

  const assignmentsList = propAssignments || BTA_ASSIGNMENTS;

  const [activeLessonId, setActiveLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem("bta_user_notes") || "";
    } catch {
      return "";
    }
  });
  const [notesSavedStatus, setNotesSavedStatus] = useState("Auto-saved");

  const activeLesson = curriculum.find(l => l.id === activeLessonId) || curriculum[0];
  
  useEffect(() => {
    const completedCount = curriculum.filter(c => c.completed).length;
    const progressPercent = Math.round((completedCount / curriculum.length) * 100);
    if(onProgressUpdate) onProgressUpdate(progressPercent, completedCount, curriculum.length);
  }, [curriculum, onProgressUpdate]);

  const toggleComplete = (id) => {
    setCurriculum(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      const completedIds = updated.filter(c => c.completed).map(c => c.id);
      localStorage.setItem("stockbit_react_progress", JSON.stringify(completedIds));
      return updated;
    });
  };

  const handleSaveNotes = (e) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem("bta_user_notes", val);
    setNotesSavedStatus("Auto-saved");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: VIDEO PLAYER & TABS */}
      <div className="lg:col-span-8 space-y-5">
        
        {/* VIDEO CARD */}
        <Card className="overflow-hidden border border-border/70 bg-card rounded-3xl shadow-sm">
          <div className="video-aspect w-full bg-black relative">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&enablejsapi=1`}
              title={activeLesson.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>

          <div className="p-5 sm:p-6 bg-card border-t border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <Badge variant="default" className="text-[10px] font-semibold py-0.5 px-2.5">{activeLesson.category}</Badge>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{activeLesson.duration} Min</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />Pemula</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug">
              {activeLesson.title}
            </h2>

            {/* CONTROL BUTTONS */}
            <div className="mt-5 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
              <Button 
                variant={activeLesson.completed ? "outline" : "default"}
                onClick={() => toggleComplete(activeLesson.id)}
                className="gap-2 px-5 font-semibold text-xs"
              >
                {activeLesson.completed ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Check className="w-4 h-4" />}
                <span>{activeLesson.completed ? "Completed" : "Mark Complete"}</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  disabled={activeLessonId <= 1}
                  onClick={() => setActiveLessonId(prev => Math.max(1, prev - 1))}
                  className="gap-1.5 text-xs font-medium px-4"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </Button>
                <Button 
                  variant="secondary" 
                  disabled={activeLessonId >= curriculum.length}
                  onClick={() => setActiveLessonId(prev => Math.min(curriculum.length, prev + 1))}
                  className="gap-1.5 text-xs font-medium px-4"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* TABS SECTION: APPLE SEGMENTED CONTROL */}
        <Card className="p-5 sm:p-6 border border-border/70 bg-card rounded-3xl shadow-sm">
          {/* Apple Segmented Pill Tabs */}
          <div className="inline-flex p-1 rounded-full bg-muted/60 border border-border/50 mb-6 text-xs font-medium">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`px-4 py-1.5 rounded-full transition-all duration-150 ${activeTab === "overview" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("assignments")} 
              className={`px-4 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1.5 ${activeTab === "assignments" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span>Worksheets</span>
              {assignmentsList.filter(a => a.lessonIds && a.lessonIds.includes(activeLesson.id)).length > 0 ? (
                <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {assignmentsList.filter(a => a.lessonIds && a.lessonIds.includes(activeLesson.id)).length}
                </span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-muted border border-border text-muted-foreground text-[9px] font-mono flex items-center justify-center">
                  0
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab("notes")} 
              className={`px-4 py-1.5 rounded-full transition-all duration-150 ${activeTab === "notes" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Notes
            </button>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {activeLesson.category.includes("LIVE ZOOM ARCHIVE") || !activeLesson.description ? (
                <div className="p-8 text-center rounded-2xl bg-muted/40 border border-dashed border-border text-muted-foreground space-y-2">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mx-auto text-muted-foreground">
                    <ListVideo className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-medium text-foreground">Interactive Recording Session</div>
                  <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
                    Follow the video breakdown and record personal trade review notes in the Notes tab.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-foreground/90 font-normal leading-relaxed">{activeLesson.description}</p>

                  {activeLesson.keyPoints && activeLesson.keyPoints.length > 0 && (
                    <div className="p-4 rounded-2xl bg-muted/60 border border-border/60 space-y-2.5 mt-4">
                      <h4 className="text-xs font-mono font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-primary" /> Key Takeaways
                      </h4>
                      <ul className="space-y-1.5 text-xs text-foreground/90 pl-1">
                        {activeLesson.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary font-bold">·</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB: ASSIGNMENTS / WORKSHEETS */}
          {activeTab === "assignments" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Assigned Worksheets</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Practice assignments directly tied to this lesson
                  </p>
                </div>
                <Badge variant="outline" className="text-[9px] font-mono">
                  BTA WORKSHEET
                </Badge>
              </div>

              {assignmentsList.filter(a => a.lessonIds && a.lessonIds.includes(activeLesson.id)).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {assignmentsList
                    .filter(a => a.lessonIds && a.lessonIds.includes(activeLesson.id))
                    .map(task => (
                      <div key={task.id} className="p-4 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/40 transition-colors flex flex-col justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="secondary" className="text-[9px] uppercase tracking-wider px-2 py-0.5">
                              {task.type}
                            </Badge>
                            <span className="text-[10px] text-primary font-mono font-medium">BTA Task</span>
                          </div>
                          <h5 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                            {task.title}
                          </h5>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {task.description}
                          </p>
                        </div>

                        <a 
                          href={task.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3.5 rounded-full bg-secondary text-foreground text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Open Worksheet ({task.fileName})</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                        </a>
                      </div>
                    ))}
                </div>
              ) : (
                /* EMPTY STATE: CLEAN APPLE STYLE */
                <div className="p-10 text-center rounded-2xl bg-muted/30 border border-dashed border-border/60 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-foreground">No Worksheet for This Lesson</h5>
                    <p className="text-[11px] text-muted-foreground max-w-sm">
                      This masterclass is purely conceptual and requires no submission.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveLessonId(prev => Math.min(curriculum.length, prev + 1))}
                    className="text-xs font-medium mt-1 gap-1 border-border/70"
                  >
                    <span>Proceed to Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* TAB: NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <textarea 
                value={notes}
                onChange={handleSaveNotes}
                rows="6" 
                placeholder="Write your personal study insights here..." 
                className="w-full bg-muted/50 border border-border/60 rounded-2xl p-4 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono leading-relaxed"
              ></textarea>
              <div className="flex justify-between items-center text-[11px] text-muted-foreground font-mono">
                <span>Status: <strong className="text-primary font-normal">{notesSavedStatus}</strong></span>
                <span className="flex items-center gap-1"><CloudSnow className="w-3.5 h-3.5" /> Local Sync</span>
              </div>
            </div>
          )}

        </Card>

      </div>

      {/* RIGHT COLUMN: CURRICULUM PLAYLIST SIDEBAR */}
      <div className="lg:col-span-4 space-y-4 sticky top-20">
        
        <Card className="p-4 sm:p-5 border border-border/70 bg-card rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-primary/10 text-primary">
                <ListVideo className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-semibold text-foreground">Curriculum Modules</h3>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono">{curriculum.length} Lessons</Badge>
          </div>

          <div className="space-y-1.5 custom-scrollbar max-h-[580px] overflow-y-auto pr-1">
            {curriculum.map(lesson => {
              const isActive = lesson.id === activeLessonId;
              return (
                <div 
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${isActive ? 'bg-primary/10 border-primary/40 text-foreground shadow-sm' : 'bg-muted/40 border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <div className="flex items-start gap-2.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all ${lesson.completed ? 'bg-primary border-primary text-white font-bold' : 'border-muted-foreground/30 hover:border-muted-foreground'}`}
                    >
                      {lesson.completed && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                    </button>
                    <div>
                      <div className={`text-xs font-medium leading-snug ${isActive ? 'text-primary font-semibold' : 'text-foreground/90'}`}>{lesson.title}</div>
                      <div className="text-[10px] font-mono text-muted-foreground mt-1 flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 text-muted-foreground" /> {lesson.duration} Min
                      </div>
                    </div>
                  </div>

                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(48,209,88,0.8)]"></div>}
                </div>
              );
            })}
          </div>
        </Card>

        {/* MENTOR CARD */}
        <Card className="p-3.5 rounded-2xl flex items-center gap-3 border border-border/60 bg-card shadow-sm">
          <Avatar fallback="AI" className="w-9 h-9 text-xs bg-primary text-white font-bold" />
          <div>
            <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>Aldi Isza</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="text-[10px] text-muted-foreground font-mono mt-0.5">BTA Trading System</div>
          </div>
        </Card>

      </div>

    </div>
  );
};
