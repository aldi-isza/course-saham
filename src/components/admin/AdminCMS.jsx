import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  ExternalLink, 
  Video, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  ArrowLeft,
  Layers,
  Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export const AdminCMS = ({ 
  curriculum, 
  assignments, 
  onSaveCurriculum, 
  onSaveAssignments, 
  onClose,
  onResetToDefaults
}) => {
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'assignments'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lesson editing state
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    duration: '',
    youtubeId: '',
    category: '',
    description: '',
    keyPoints: ''
  });

  // Assignment editing state
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentFormData, setAssignmentFormData] = useState({
    title: '',
    type: 'PDF Worksheet',
    description: '',
    fileUrl: '',
    fileName: '',
    lessonIds: ''
  });

  const [notification, setNotification] = useState('');

  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // --- LESSON HANDLERS ---
  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setLessonFormData({
      title: lesson.title,
      duration: lesson.duration,
      youtubeId: lesson.youtubeId,
      category: lesson.category,
      description: lesson.description || '',
      keyPoints: Array.isArray(lesson.keyPoints) ? lesson.keyPoints.join('\n') : ''
    });
  };

  const handleSaveLesson = (e) => {
    e.preventDefault();
    if (!editingLesson) return;

    const updated = curriculum.map(item => {
      if (item.id === editingLesson.id) {
        return {
          ...item,
          title: lessonFormData.title,
          duration: lessonFormData.duration,
          youtubeId: lessonFormData.youtubeId,
          category: lessonFormData.category,
          description: lessonFormData.description,
          keyPoints: lessonFormData.keyPoints
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean)
        };
      }
      return item;
    });

    onSaveCurriculum(updated);
    setEditingLesson(null);
    triggerToast(`Lesson #${editingLesson.id} successfully updated!`);
  };

  // --- ASSIGNMENT HANDLERS ---
  const handleEditAssignment = (assign) => {
    setEditingAssignment(assign);
    setAssignmentFormData({
      title: assign.title,
      type: assign.type,
      description: assign.description,
      fileUrl: assign.fileUrl,
      fileName: assign.fileName,
      lessonIds: Array.isArray(assign.lessonIds) ? assign.lessonIds.join(', ') : ''
    });
  };

  const handleCreateAssignment = () => {
    const newId = `hw-${Date.now()}`;
    const newObj = {
      id: newId,
      level: "CUSTOM LEVEL",
      title: "New Practical Assignment",
      type: "PDF Worksheet",
      description: "Assignment instructions and submission objectives.",
      fileUrl: "https://drive.google.com/",
      fileName: "Worksheet.pdf",
      lessonIds: [1]
    };
    const updated = [newObj, ...assignments];
    onSaveAssignments(updated);
    handleEditAssignment(newObj);
    triggerToast('New assignment draft created!');
  };

  const handleDeleteAssignment = (id) => {
    if (!window.confirm('Delete this assignment?')) return;
    const updated = assignments.filter(a => a.id !== id);
    onSaveAssignments(updated);
    if (editingAssignment?.id === id) setEditingAssignment(null);
    triggerToast('Assignment removed.');
  };

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    if (!editingAssignment) return;

    const parsedLessonIds = assignmentFormData.lessonIds
      .split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));

    const updated = assignments.map(a => {
      if (a.id === editingAssignment.id) {
        return {
          ...a,
          title: assignmentFormData.title,
          type: assignmentFormData.type,
          description: assignmentFormData.description,
          fileUrl: assignmentFormData.fileUrl,
          fileName: assignmentFormData.fileName,
          lessonIds: parsedLessonIds
        };
      }
      return a;
    });

    onSaveAssignments(updated);
    setEditingAssignment(null);
    triggerToast('Assignment saved successfully!');
  };

  // Filtered lists
  const filteredCurriculum = curriculum.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssignments = assignments.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* CMS TOP BAR */}
      <div className="border-b border-border bg-card sticky top-0 z-40 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose} className="gap-1.5 text-xs">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Course</span>
          </Button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px] font-mono font-bold">CMS ADMIN</Badge>
            <span className="text-xs font-semibold text-foreground hidden sm:inline">Local Database Manager</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {notification && (
            <span className="text-xs text-primary font-mono bg-primary/10 px-2.5 py-1 rounded animate-fade-in">
              {notification}
            </span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetToDefaults}
            className="text-xs gap-1 border-border text-muted-foreground hover:text-foreground"
            title="Reset database to default curriculum"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </Button>
        </div>
      </div>

      {/* CMS MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6">
        {/* TAB TOGGLES & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('lessons'); setEditingAssignment(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
                activeTab === 'lessons' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Lessons & Videos ({curriculum.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('assignments'); setEditingLesson(null); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-2 ${
                activeTab === 'assignments' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Classroom Assignments ({assignments.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-48 sm:w-64"
              />
            </div>
            {activeTab === 'assignments' && (
              <Button size="sm" onClick={handleCreateAssignment} className="text-xs gap-1.5 bg-primary text-white">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </Button>
            )}
          </div>
        </div>

        {/* TAB CONTENT: LESSONS */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LESSONS LIST */}
            <div className="lg:col-span-7 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredCurriculum.map(lesson => (
                <div 
                  key={lesson.id}
                  className={`p-3.5 rounded-lg border transition flex items-start justify-between gap-3 ${
                    editingLesson?.id === lesson.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">#{lesson.id}</span>
                      <span className="text-[10px] font-bold text-primary">{lesson.category}</span>
                    </div>
                    <div className="text-xs font-bold text-foreground">{lesson.title}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">
                      YouTube: <code className="text-foreground">{lesson.youtubeId}</code> · {lesson.duration} Min
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditLesson(lesson)}
                    className="text-xs gap-1 border-border shrink-0"
                  >
                    <Edit3 className="w-3 h-3 text-primary" />
                    <span>Edit</span>
                  </Button>
                </div>
              ))}
            </div>

            {/* EDITING DRAWER / PANEL */}
            <div className="lg:col-span-5">
              {editingLesson ? (
                <Card className="p-5 border-border bg-card sticky top-24 space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="text-xs font-bold text-foreground">Edit Lesson #{editingLesson.id}</div>
                    <Button variant="ghost" size="sm" onClick={() => setEditingLesson(null)}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <form onSubmit={handleSaveLesson} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Title</label>
                      <input 
                        type="text" 
                        value={lessonFormData.title}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Duration (Min)</label>
                        <input 
                          type="text" 
                          value={lessonFormData.duration}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, duration: e.target.value })}
                          className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">YouTube ID</label>
                        <input 
                          type="text" 
                          value={lessonFormData.youtubeId}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, youtubeId: e.target.value })}
                          className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Category / Level</label>
                      <input 
                        type="text" 
                        value={lessonFormData.category}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, category: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Video Summary</label>
                      <textarea 
                        rows={3}
                        value={lessonFormData.description}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, description: e.target.value })}
                        placeholder="Leave blank for Zoom recordings..."
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Key Takeaways (1 per line)</label>
                      <textarea 
                        rows={3}
                        value={lessonFormData.keyPoints}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, keyPoints: e.target.value })}
                        placeholder="Bullet points..."
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setEditingLesson(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" className="bg-primary text-white gap-1.5 font-bold">
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <div className="border border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-xs">
                  Select a lesson from the list to modify its YouTube video ID or syllabus content.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENT: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ASSIGNMENTS LIST */}
            <div className="lg:col-span-7 space-y-3 max-h-[720px] overflow-y-auto pr-1">
              {filteredAssignments.map(assign => (
                <div 
                  key={assign.id}
                  className={`p-4 rounded-lg border transition flex items-start justify-between gap-3 ${
                    editingAssignment?.id === assign.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono py-0">{assign.type}</Badge>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        Assigned to Lessons: {Array.isArray(assign.lessonIds) ? assign.lessonIds.join(', ') : 'None'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-foreground">{assign.title}</div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{assign.description}</p>
                    <div className="text-[10px] font-mono text-primary flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {assign.fileName}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditAssignment(assign)}
                      className="text-xs gap-1 border-border"
                    >
                      <Edit3 className="w-3 h-3 text-primary" />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteAssignment(assign.id)}
                      className="text-xs text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* EDIT ASSIGNMENT DRAWER */}
            <div className="lg:col-span-5">
              {editingAssignment ? (
                <Card className="p-5 border-border bg-card sticky top-24 space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="text-xs font-bold text-foreground">Edit Assignment ({editingAssignment.id})</div>
                    <Button variant="ghost" size="sm" onClick={() => setEditingAssignment(null)}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <form onSubmit={handleSaveAssignment} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Task Title</label>
                      <input 
                        type="text" 
                        value={assignmentFormData.title}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Document Type</label>
                        <select 
                          value={assignmentFormData.type}
                          onChange={(e) => setAssignmentFormData({ ...assignmentFormData, type: e.target.value })}
                          className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        >
                          <option value="PDF Worksheet">PDF Worksheet</option>
                          <option value="Document (Word)">Document (Word)</option>
                          <option value="Image / Worksheet">Image / Worksheet</option>
                          <option value="Document Guide">Document Guide</option>
                          <option value="Reference E-Book (PDF)">Reference E-Book (PDF)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground mb-1">File Display Name</label>
                        <input 
                          type="text" 
                          value={assignmentFormData.fileName}
                          onChange={(e) => setAssignmentFormData({ ...assignmentFormData, fileName: e.target.value })}
                          className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Associated Lesson IDs (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 9, 10, 11"
                        value={assignmentFormData.lessonIds}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, lessonIds: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">
                        If matched, this task appears in that video's task tab. If blank, it stays general.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Download / Google Drive URL</label>
                      <input 
                        type="url" 
                        value={assignmentFormData.fileUrl}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, fileUrl: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Instructions / Description</label>
                      <textarea 
                        rows={3}
                        value={assignmentFormData.description}
                        onChange={(e) => setAssignmentFormData({ ...assignmentFormData, description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-muted border border-border rounded text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setEditingAssignment(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" className="bg-primary text-white gap-1.5 font-bold">
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Task</span>
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <div className="border border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-xs">
                  Click 'Edit' or 'Add Task' to manage Google Classroom assignments and download URLs.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
