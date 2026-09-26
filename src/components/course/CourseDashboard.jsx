import React, { useState, useEffect } from 'react';
import { CheckCircle2, Check, ChevronLeft, ChevronRight, Clock, BookOpen, Sparkles, Heart, CloudSnow, ListVideo, PlayCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input, Avatar } from '../ui/input';
import { INITIAL_CURRICULUM } from '../../data/curriculumData';

export const CourseDashboard = ({ onProgressUpdate }) => {
  const [curriculum, setCurriculum] = useState(INITIAL_CURRICULUM);
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [notesSavedStatus, setNotesSavedStatus] = useState("Tersimpan otomatis");
  const [streamInput, setStreamInput] = useState("");
  const [streamComments, setStreamComments] = useState([
    {
      id: 1,
      author: "@hendra_investor",
      badge: "Pro Trader",
      time: "2 jam lalu",
      likes: 24,
      content: "Penjelasan mekanisme $IHSG dan antrean Bid-Offer di menit 08:30 sangat jelas buat pemula yang baru install sekuritas. Mantap modulnya! 👍"
    },
    {
      id: 2,
      author: "@cuan_syariah",
      badge: null,
      time: "5 jam lalu",
      likes: 15,
      content: "Keren materinya! Kira-kira nanti di modul lanjutan ada sesi bedah emiten sektor perbankan $BBCA dan $BBRI gak ya?"
    }
  ]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("stockbit_react_notes");
    if (savedNotes) setNotes(savedNotes);

    const savedProgress = localStorage.getItem("stockbit_react_progress");
    if (savedProgress) {
      const completedIds = JSON.parse(savedProgress);
      setCurriculum(prev => prev.map(item => ({
        ...item,
        completed: completedIds.includes(item.id)
      })));
    }
  }, []);

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
    localStorage.setItem("stockbit_react_notes", val);
    setNotesSavedStatus("Tersimpan otomatis");
  };

  const handleAddComment = () => {
    if (!streamInput.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "@aldi_isza",
      badge: "Pro Member",
      time: "Baru saja",
      likes: 0,
      content: streamInput
    };
    setStreamComments([newComment, ...streamComments]);
    setStreamInput("");
  };

  const renderCommentText = (text) => {
    const parts = text.split(/(\$[A-Z]+)/g);
    return parts.map((part, i) => 
      part.startsWith('$') ? <span key={i} className="text-primary font-mono font-bold">{part}</span> : part
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: VIDEO PLAYER & TABS */}
      <div className="lg:col-span-8 space-y-5">
        
        {/* VIDEO CARD */}
        <Card className="overflow-hidden border-border bg-card">
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

          <div className="p-5 sm:p-6 border-t border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
              <Badge variant="default" className="text-[10px] py-1 border-primary/20">{activeLesson.category}</Badge>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" />{activeLesson.duration} Min</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-500" />Level: Pemula</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mt-1">
              {activeLesson.title}
            </h2>

            {/* EMITEN CHIPS */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <span className="text-[11px] font-medium text-slate-400">Emiten Terkait:</span>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded bg-muted border border-border text-primary font-bold hover:border-primary/50 cursor-pointer transition">BBCA +1.45%</span>
                <span className="px-2 py-0.5 rounded bg-muted border border-border text-destructive font-bold hover:border-destructive/50 cursor-pointer transition">BBRI -0.48%</span>
                <span className="px-2 py-0.5 rounded bg-muted border border-border text-primary font-bold hover:border-primary/50 cursor-pointer transition">BMRI +0.70%</span>
              </div>
            </div>

            {/* CONTROL BUTTONS */}
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <Button 
                variant={activeLesson.completed ? "outline" : "default"}
                onClick={() => toggleComplete(activeLesson.id)}
                className="gap-2 px-5"
              >
                {activeLesson.completed ? <CheckCircle2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                <span>{activeLesson.completed ? "Selesai Dipelajari" : "Tandai Selesai"}</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  disabled={activeLessonId <= 1}
                  onClick={() => setActiveLessonId(prev => Math.max(1, prev - 1))}
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
                </Button>
                <Button 
                  variant="secondary" 
                  disabled={activeLessonId >= curriculum.length}
                  onClick={() => setActiveLessonId(prev => Math.min(curriculum.length, prev + 1))}
                  className="gap-1.5"
                >
                  Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* SHADCN TABS SECTION */}
        <Card className="p-5 sm:p-6 border-border">
          <div className="flex items-center gap-6 border-b border-border pb-3 mb-5 text-xs font-bold overflow-x-auto custom-scrollbar">
            <button 
              onClick={() => setActiveTab("overview")} 
              className={`pb-3 -mb-3 transition whitespace-nowrap ${activeTab === "overview" ? "text-white border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"}`}
            >
              Ringkasan Materi
            </button>
            <button 
              onClick={() => setActiveTab("keystats")} 
              className={`pb-3 -mb-3 transition whitespace-nowrap ${activeTab === "keystats" ? "text-white border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"}`}
            >
              Keystats & Ratio
            </button>
            <button 
              onClick={() => setActiveTab("stream")} 
              className={`pb-3 -mb-3 transition whitespace-nowrap flex items-center gap-1.5 ${activeTab === "stream" ? "text-white border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"}`}
            >
              <span>Stream Komunitas</span>
              <Badge variant="default" className="px-1.5 py-0 border-none">{streamComments.length}</Badge>
            </button>
            <button 
              onClick={() => setActiveTab("notes")} 
              className={`pb-3 -mb-3 transition whitespace-nowrap ${activeTab === "notes" ? "text-white border-b-2 border-primary" : "text-slate-400 hover:text-slate-200"}`}
            >
              Catatan Pribadi
            </button>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>{activeLesson.description}</p>

              <div className="p-4 rounded-lg bg-muted border border-border space-y-2.5 mt-4">
                <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Poin Kunci Yang Dipelajari:
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 pl-1">
                  <li>Perbedaan antara Investasi Jangka Panjang (Investing) vs Trading Harian.</li>
                  <li>Struktur Pasar Modal Indonesia (OJK, BEI, KSEI, KPEI).</li>
                  <li>Cara membaca Orderbook: Bid (Antrean Beli) & Offer/Ask (Antrean Jual).</li>
                  <li>Psikologi dasar dalam menghadapi fluktuasi harga saham harian.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: KEYSTATS */}
          {activeTab === "keystats" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Contoh Screening: BBCA (Bank Central Asia)</h4>
                  <p className="text-[11px] text-slate-400">Financial Metrics & Valuation Ratios</p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">LQ45 · Big Cap</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <div className="text-[10px] font-mono text-slate-400">P/E RATIO (TTM)</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">23.4x</div>
                  <div className="text-[10px] text-primary font-mono">Industry: 18.2x</div>
                </div>
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <div className="text-[10px] font-mono text-slate-400">P/B RATIO (PBV)</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">4.8x</div>
                  <div className="text-[10px] text-slate-400 font-mono">Book Val: Rp 2,187</div>
                </div>
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <div className="text-[10px] font-mono text-slate-400">ROE (ANNUAL)</div>
                  <div className="text-base font-bold text-primary font-mono mt-0.5">22.1%</div>
                  <div className="text-[10px] text-primary font-mono">High Efficiency</div>
                </div>
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <div className="text-[10px] font-mono text-slate-400">DIVIDEND YIELD</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">2.65%</div>
                  <div className="text-[10px] text-slate-400 font-mono">DPR: 68.4%</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: STREAM */}
          {activeTab === "stream" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-muted border border-border space-y-3">
                <div className="flex gap-2.5 items-center">
                  <Avatar fallback="AI" />
                  <Input 
                    value={streamInput}
                    onChange={(e) => setStreamInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Bagikan pandangan kamu... (cth: $BBCA $IHSG)" 
                    className="bg-card"
                  />
                  <Button onClick={handleAddComment} size="sm" className="px-4">Post</Button>
                </div>
              </div>

              <div className="space-y-3">
                {streamComments.map(comment => (
                  <div key={comment.id} className="p-4 rounded-lg bg-muted border border-border space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-200">{comment.author}</span>
                        {comment.badge && <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-card border-border">{comment.badge}</Badge>}
                        <span className="text-[10px] text-slate-500 font-mono">{comment.time}</span>
                      </div>
                      <button className="text-slate-500 hover:text-destructive text-xs flex items-center gap-1.5 transition">
                        <Heart className="w-3.5 h-3.5" /><span>{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{renderCommentText(comment.content)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <textarea 
                value={notes}
                onChange={handleSaveNotes}
                rows="6" 
                placeholder="Tulis catatan penting kamu di sini... (otomatis tersimpan secara lokal)" 
                className="w-full bg-muted border border-border rounded-lg p-4 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary font-mono leading-relaxed"
              ></textarea>
              <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
                <span>Status: <strong className="text-primary font-normal">{notesSavedStatus}</strong></span>
                <span className="flex items-center gap-1"><CloudSnow className="w-3.5 h-3.5" /> Local Sync Active</span>
              </div>
            </div>
          )}

        </Card>

      </div>

      {/* RIGHT COLUMN: CURRICULUM PLAYLIST SIDEBAR */}
      <div className="lg:col-span-4 space-y-4 sticky top-24">
        
        <Card className="p-4 sm:p-5 border-border">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                <ListVideo className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Kurikulum</h3>
            </div>
            <Badge variant="outline" className="border-border text-slate-400">8 Modul</Badge>
          </div>

          <div className="space-y-2 custom-scrollbar max-h-[560px] overflow-y-auto pr-1">
            {curriculum.map(lesson => {
              const isActive = lesson.id === activeLessonId;
              return (
                <div 
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`p-3 rounded-lg border transition cursor-pointer flex items-start justify-between gap-3 ${isActive ? 'bg-primary/10 border-l-4 border-l-primary border-t-primary/20 border-r-primary/20 border-b-primary/20 text-white shadow-sm' : 'bg-muted border-border text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}
                >
                  <div className="flex items-start gap-2.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}
                      className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition ${lesson.completed ? 'bg-primary border-primary text-background font-bold' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                      {lesson.completed && <Check className="w-3 h-3 text-background" />}
                    </button>
                    <div>
                      <div className={`text-xs font-semibold leading-snug ${isActive ? 'text-primary' : 'text-slate-200'}`}>{lesson.title}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> {lesson.duration} Min
                      </div>
                    </div>
                  </div>

                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,194,111,0.8)]"></div>}
                </div>
              );
            })}
          </div>
        </Card>

        {/* MENTOR CARD */}
        <Card className="p-4 flex items-center gap-3 border-border">
          <Avatar fallback="AI" className="w-10 h-10 text-sm bg-primary text-background font-black" />
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Aldi Isza, WMI</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Head of Equity Research</div>
          </div>
        </Card>

      </div>

    </div>
  );
};
