import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  MessageSquare,
  LogOut,
  Settings,
  Bell,
  Target,
  Home,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  CheckCircle2,
  Circle,
  Flag,
  AlarmClock,
  Clock,
  Plus,
  Repeat,
  Calendar as CalendarIcon,
  Check,
  Save,
  Camera,
  Upload,
  Download,
  FileText,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// ---------- Helpers & UI primitives ----------
function clsx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Avatar({ name, profilePicture, size = 40 }) {
  const initials = useMemo(() => {
    const parts = name.split(" ");
    return (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
  }, [name]);

  if (profilePicture) {
    return (
      <div
        className="rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm"
        style={{ width: size, height: size }}
        aria-label={name}
        title={name}
      >
        <img 
          src={profilePicture} 
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `
              <div class="w-full h-full flex items-center justify-center font-semibold text-white" style="background: linear-gradient(135deg,#ff9f69,#f56d6d)">
                ${initials}
              </div>
            `;
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: "linear-gradient(135deg,#ff9f69,#f56d6d)" }}
      aria-label={name}
      title={name}
    >
      {initials}
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------- Task types & storage ----------
const defaultTasks = [
  { id: "t1", title: "Daily standup notes", due: todayISO(), startTime: "09:00", endTime: "09:30", priority: "high", done: false, project: "Work" },
  { id: "t2", title: "30‑min workout", due: todayISO(), startTime: "07:00", endTime: "07:30", priority: "medium", done: true, project: "Health" },
  { id: "t3", title: "Read 20 pages", due: addDaysISO(0), startTime: "20:00", endTime: "20:45", priority: "low", done: false, project: "Personal" },
  { id: "t4", title: "Prepare client deck", due: addDaysISO(1), startTime: "14:00", endTime: "16:00", priority: "high", done: false, project: "Work" },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function addDaysISO(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// ---------- Small components ----------
function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#e8f5ff,#f3f7ff)" }}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-lg font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function Pill({ children, className }) {
  return <span className={clsx("inline-flex items-center px-2 py-0.5 rounded-md text-xs", className)}>{children}</span>;
}

// ---------- Calendar with real dates ----------
function Calendar({ selected, onSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get first day of current month
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayWeekday = firstDayOfMonth.getDay();
  const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1; // Make Monday = 0
  
  // Generate calendar days
  const daysInMonth = lastDayOfMonth.getDate();
  const calendarDays = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Split into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={goToPreviousMonth} className="p-1 hover:bg-slate-100 rounded">
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button onClick={goToNextMonth} className="p-1 hover:bg-slate-100 rounded">
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-[11px] text-slate-400 mb-2">
        {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2 mb-2">
          {week.map((day, dayIndex) => {
            if (!day) {
              return <div key={`empty-${dayIndex}`} className="h-9" />;
            }
            
            const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selected === dateString;
            const isToday = dateString === new Date().toISOString().slice(0, 10);
            
            return (
              <button
                type="button"
                onClick={() => onSelect?.(dateString)}
                key={day}
                className={clsx(
                  "h-9 flex items-center justify-center rounded-full text-xs font-medium transition-colors",
                  isSelected 
                    ? "bg-amber-500 text-white" 
                    : isToday
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ---------- Tasks ----------
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState(todayISO());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [priority, setPriority] = useState("medium");
  const [project, setProject] = useState("General");
  const [recurring, setRecurring] = useState("none"); // none, everyday, weekdays
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  
  const weekdays = [
    { key: 'mon', label: 'M', full: 'Monday' },
    { key: 'tue', label: 'T', full: 'Tuesday' },
    { key: 'wed', label: 'W', full: 'Wednesday' },
    { key: 'thu', label: 'T', full: 'Thursday' },
    { key: 'fri', label: 'F', full: 'Friday' },
    { key: 'sat', label: 'S', full: 'Saturday' },
    { key: 'sun', label: 'S', full: 'Sunday' }
  ];
  
  const toggleWeekday = (day) => {
    setSelectedWeekdays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    // Validate time range
    if (startTime >= endTime) {
      alert("Start time must be before end time");
      return;
    }
    
    // Validate recurring selection
    if (recurring === 'weekdays' && selectedWeekdays.length === 0) {
      alert("Please select at least one day of the week");
      return;
    }
    
    onAdd({ 
      title, 
      due, 
      startTime, 
      endTime, 
      priority, 
      project, 
      recurring, 
      selectedWeekdays: recurring === 'weekdays' ? selectedWeekdays : []
    });
    
    setTitle("");
    // Reset times to next hour slot
    const nextHour = String(parseInt(endTime.split(':')[0]) + 1).padStart(2, '0');
    setStartTime(endTime);
    setEndTime(`${nextHour}:00`);
    // Keep recurring settings for convenience
  };
  
  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          className="flex-1 min-w-[200px] rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input 
          type="date" 
          value={due} 
          onChange={(e) => setDue(e.target.value)} 
          className="rounded-xl bg-white ring-1 ring-slate-200 px-2 py-2 text-sm focus:ring-2 focus:ring-amber-400" 
        />
        <div className="flex items-center gap-1 bg-white ring-1 ring-slate-200 rounded-xl px-2 py-2">
          <input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)} 
            className="text-sm focus:outline-none w-20" 
          />
          <span className="text-slate-400 text-xs">to</span>
          <input 
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)} 
            className="text-sm focus:outline-none w-20" 
          />
        </div>
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className="rounded-xl bg-white ring-1 ring-slate-200 px-2 py-2 text-sm focus:ring-2 focus:ring-amber-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-white shadow hover:brightness-105">
          <Plus className="w-4 h-4"/> Add
        </button>
      </form>
      
      {/* Recurring Options */}
      <div className="bg-slate-50 rounded-xl p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Repeat className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Repeat</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setRecurring('none')}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              recurring === 'none' 
                ? "bg-slate-600 text-white" 
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            )}
          >
            No Repeat
          </button>
          <button
            type="button"
            onClick={() => setRecurring('everyday')}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              recurring === 'everyday' 
                ? "bg-amber-500 text-white" 
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            )}
          >
            Every Day
          </button>
          <button
            type="button"
            onClick={() => setRecurring('weekdays')}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              recurring === 'weekdays' 
                ? "bg-blue-500 text-white" 
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
            )}
          >
            Custom Days
          </button>
        </div>
        
        {/* Weekday Selection */}
        {recurring === 'weekdays' && (
          <div className="space-y-2">
            <div className="text-xs text-slate-600">Select days:</div>
            <div className="flex gap-1">
              {weekdays.map(day => (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => toggleWeekday(day.key)}
                  className={clsx(
                    "w-8 h-8 rounded-full text-xs font-medium transition-colors",
                    selectedWeekdays.includes(day.key)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                  )}
                  title={day.full}
                >
                  {day.label}
                </button>
              ))}
            </div>
            {selectedWeekdays.length > 0 && (
              <div className="text-xs text-slate-500">
                Repeats on: {selectedWeekdays.map(day => weekdays.find(w => w.key === day)?.full).join(', ')}
              </div>
            )}
          </div>
        )}
        
        {recurring === 'everyday' && (
          <div className="text-xs text-slate-500">
            This task will be created for every day
          </div>
        )}
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete }) {
  const priColor =
    task.priority === "high"
      ? "bg-rose-50 text-rose-600"
      : task.priority === "medium"
      ? "bg-amber-50 text-amber-600"
      : "bg-emerald-50 text-emerald-600";
  
  // Format time display
  const formatTime = (time) => {
    if (!time) return '';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const timeRange = task.startTime && task.endTime 
    ? `${formatTime(task.startTime)} - ${formatTime(task.endTime)}`
    : '';
  
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-100 shadow-sm">
      <button onClick={() => onToggle(task.id)} className="shrink-0">
        {task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className={clsx("text-sm font-medium", task.done && "line-through text-slate-400")}>{task.title}</div>
        {timeRange && (
          <div className={clsx("text-xs flex items-center gap-1 mt-1", task.done ? "text-slate-300" : "text-slate-500")}>
            <Clock className="w-3 h-3" />
            {timeRange}
          </div>
        )}
      </div>
      <Pill className={priColor}><Flag className="w-3 h-3 mr-1"/> {task.priority}</Pill>
      <button onClick={() => onDelete(task.id)} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-5 h-5"/></button>
    </div>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length)
    return <div className="text-sm text-slate-400">No tasks for this filter.</div>;
  return (
    <div className="space-y-2">
      {tasks.map((t) => (
        <TaskRow key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}

// ---------- Right Panel (Profile + Calendar + Agenda) ----------
function RightPanel({ selectedDate, setSelectedDate, agenda, name, setName, profilePicture, setProfilePicture }) {
  const [openProfile, setOpenProfile] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Preset avatars
  const presetAvatars = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face&auto=format", 
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format"
  ];

  return (
    <aside className="w-[340px] shrink-0 pl-6">
      <div className="rounded-3xl bg-[#f6f9f6] p-6 ring-1 ring-slate-100 relative overflow-hidden">
        <div className="absolute right-[-16px] top-[30px] rotate-[25deg] opacity-20">
          <div className="w-24 h-24 rounded-full bg-emerald-300" />
        </div>
        <div className="flex items-center gap-4">
          <Avatar name={name} profilePicture={profilePicture} size={64} />
          <div>
            <div className="text-lg font-semibold text-slate-800">{name}</div>
            <div className="text-xs text-slate-400">Planner</div>
          </div>
        </div>
        <button onClick={() => setOpenProfile(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-2 text-sm shadow hover:brightness-105">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
        <div className="mt-6">
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700">Agenda</h4>
            <div className="text-xs text-slate-400">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="space-y-3">
            {agenda.map((s, idx) => (
              <div key={idx} className={clsx(
                "rounded-2xl bg-white p-3 ring-1 ring-slate-100 shadow-sm transition-opacity",
                s.done && "opacity-60"
              )}>
                <div className="flex items-center justify-between mb-1">
                  <div className={clsx(
                    "text-[11px] font-medium",
                    s.done ? "text-emerald-600" : s.startTime ? "text-blue-600" : "text-slate-400"
                  )}>{s.time}</div>
                  {s.duration && (
                    <div className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                      {s.duration}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={clsx(
                      "text-sm font-semibold",
                      s.done ? "text-slate-500 line-through" : "text-slate-700"
                    )}>{s.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={clsx("text-xs inline-flex px-2 py-0.5 rounded-md", s.color)}>{s.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!agenda.length && (
              <div className="text-center py-4">
                <div className="text-xs text-slate-400">No tasks for this date</div>
                <div className="text-xs text-slate-300 mt-1">Add a task to get started</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={openProfile} onClose={() => setOpenProfile(false)} title="Edit Profile">
        <div className="space-y-4">
          {/* Profile Picture Section */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Profile Picture</label>
            <div className="mt-2 flex items-center gap-4">
              <Avatar name={name} profilePicture={profilePicture} size={80} />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer text-xs font-medium">
                    <Camera className="w-4 h-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {profilePicture && (
                    <button 
                      onClick={() => setProfilePicture("")}
                      className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Preset Avatars */}
            <div className="mt-3">
              <div className="text-xs text-slate-500 mb-2">Or choose a preset:</div>
              <div className="grid grid-cols-6 gap-2">
                {presetAvatars.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => setProfilePicture(avatar)}
                    className={clsx(
                      "w-12 h-12 rounded-full overflow-hidden border-2 hover:scale-105 transition-transform",
                      profilePicture === avatar ? "border-amber-400 ring-2 ring-amber-200" : "border-gray-200"
                    )}
                  >
                    <img src={avatar} alt={`Preset ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Name Section */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Display name</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 w-full rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your name"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <button 
            onClick={() => setOpenProfile(false)} 
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button 
            onClick={() => setOpenProfile(false)} 
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </aside>
  );
}

// ---------- Main App ----------
export default function DailyTasksDashboard() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("taskflow.tasks");
      console.log("Loading tasks from localStorage:", saved ? "found data" : "no data");
      return saved ? JSON.parse(saved) : defaultTasks;
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return defaultTasks;
    }
  });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | today | done | pending | high
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [showSettings, setShowSettings] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // "", "saving", "saved"
  const [name, setName] = useState(() => {
    try {
      const saved = localStorage.getItem("taskflow.username");
      return saved || "Christian Pulisic";
    } catch (error) {
      console.error("Error loading username:", error);
      return "Christian Pulisic";
    }
  });
  const [profilePicture, setProfilePicture] = useState(() => {
    try {
      const saved = localStorage.getItem("taskflow.profilePicture");
      return saved || "";
    } catch (error) {
      console.error("Error loading profile picture:", error);
      return "";
    }
  });

  useEffect(() => {
    // Don't save default tasks on first load
    if (tasks === defaultTasks) return;
    
    setSaveStatus("saving");
    const saveTimer = setTimeout(() => {
      try {
        const dataToSave = JSON.stringify(tasks);
        localStorage.setItem("taskflow.tasks", dataToSave);
        console.log("Saved tasks to localStorage:", tasks.length, "tasks");
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 2000);
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }, 300);

    return () => clearTimeout(saveTimer);
  }, [tasks]);

  // Save name to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("taskflow.username", name);
    } catch (error) {
      console.error("Error saving username:", error);
    }
  }, [name]);

  // Save profile picture to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("taskflow.profilePicture", profilePicture);
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  }, [profilePicture]);

  // Data export/import functions
  const exportData = () => {
    const data = {
      tasks,
      name,
      profilePicture,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `taskflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          
          if (importedData.tasks) setTasks(importedData.tasks);
          if (importedData.name) setName(importedData.name);
          if (importedData.profilePicture) setProfilePicture(importedData.profilePicture);
          
          alert("Data imported successfully!");
        } catch (error) {
          console.error("Error importing data:", error);
          alert("Error importing data. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
    // Reset the input
    event.target.value = '';
  };

  // Helper functions for recurring tasks
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[date.getDay()];
  };
  
  const getNextDates = (startDate, days = 30) => {
    const dates = [];
    const start = new Date(startDate);
    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  };
  
  function addTask({ title, due, startTime, endTime, priority, project, recurring = 'none', selectedWeekdays = [] }) {
    const baseTasks = [];
    
    if (recurring === 'none') {
      // Single task
      const id = Math.random().toString(36).slice(2);
      baseTasks.push({ id, title, due, startTime, endTime, priority, project, done: false });
    } else if (recurring === 'everyday') {
      // Create tasks for next 30 days
      const dates = getNextDates(due, 30);
      dates.forEach(date => {
        const id = Math.random().toString(36).slice(2);
        baseTasks.push({ 
          id, 
          title: `${title} (Daily)`, 
          due: date, 
          startTime, 
          endTime, 
          priority, 
          project, 
          done: false,
          recurring: 'everyday'
        });
      });
    } else if (recurring === 'weekdays') {
      // Create tasks for selected weekdays for next 8 weeks
      const dates = getNextDates(due, 56); // 8 weeks
      dates.forEach(date => {
        const dayOfWeek = getDayOfWeek(date);
        if (selectedWeekdays.includes(dayOfWeek)) {
          const id = Math.random().toString(36).slice(2);
          const weekdayNames = selectedWeekdays.map(day => {
            const dayMap = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };
            return dayMap[day];
          }).join(', ');
          baseTasks.push({ 
            id, 
            title: `${title} (${weekdayNames})`, 
            due: date, 
            startTime, 
            endTime, 
            priority, 
            project, 
            done: false,
            recurring: 'weekdays',
            weekdays: selectedWeekdays
          });
        }
      });
    }
    
    setTasks((t) => [...t, ...baseTasks]);
  }
  function toggleTask(id) {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function deleteTask(id) {
    setTasks((ts) => ts.filter((t) => t.id !== id));
  }

  // Helper function for time-based sorting
  const sortByTime = (a, b) => {
    // First, sort by date
    if (a.due !== b.due) {
      return a.due.localeCompare(b.due);
    }
    
    // Then by completion status (pending tasks first)
    if (a.done !== b.done) {
      return a.done ? 1 : -1;
    }
    
    // Then by start time if both have times
    if (a.startTime && b.startTime) {
      return a.startTime.localeCompare(b.startTime);
    }
    
    // Tasks with times come before tasks without times
    if (a.startTime && !b.startTime) return -1;
    if (!a.startTime && b.startTime) return 1;
    
    // Finally, sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Last resort: alphabetical
    return a.title.localeCompare(b.title);
  };
  
  // derive
  const filtered = tasks
    .filter((t) => (filter === "today" ? t.due === todayISO() : true))
    .filter((t) => (filter === "done" ? t.done : filter === "pending" ? !t.done : true))
    .filter((t) => (filter === "high" ? t.priority === "high" : true))
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    .sort(sortByTime);

  const agenda = tasks
    .filter((t) => t.due === selectedDate)
    .sort((a, b) => {
      // Sort completed tasks to the bottom
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      
      // Sort by start time (earliest first)
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      
      // Tasks with times come before tasks without times
      if (a.startTime && !b.startTime) return -1;
      if (!a.startTime && b.startTime) return 1;
      
      // For tasks without times, sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      return a.title.localeCompare(b.title);
    })
    .slice(0, 6)
    .map((t) => {
      // Format time display
      const formatTime = (time) => {
        if (!time) return '';
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      };
      
      const timeDisplay = t.done 
        ? "✓ Completed" 
        : t.startTime && t.endTime
        ? `${formatTime(t.startTime)} - ${formatTime(t.endTime)}`
        : "All day";
      
      return {
        time: timeDisplay,
        title: t.title,
        desc: `${t.priority} priority • ${t.project || 'General'}`,
        done: t.done,
        startTime: t.startTime,
        duration: t.startTime && t.endTime ? 
          Math.round((new Date(`2000-01-01T${t.endTime}`) - new Date(`2000-01-01T${t.startTime}`)) / 60000) + ' min' : '',
        color:
          t.priority === "high"
            ? "bg-rose-500/10 text-rose-600"
            : t.priority === "medium"
            ? "bg-amber-500/10 text-amber-600"
            : "bg-emerald-500/10 text-emerald-600",
      };
    });

  // weekly chart: tasks completed in last 7 days
  const week = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().slice(0, 10);
    return {
      day: d.toLocaleDateString(undefined, { weekday: "short" }),
      value: tasks.filter((t) => t.done && t.due === ds).length,
      highlight: i === 3,
    };
  });

  const stats = {
    totalToday: tasks.filter((t) => t.due === todayISO()).length,
    completed: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="flex gap-6">
          {/* Left rail */}
          <aside className="w-16 shrink-0">
            <div className="h-full rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm p-4 flex flex-col items-center gap-4">
              <div className="mt-1"><Target className="w-6 h-6 text-amber-500" title="Dashboard" /></div>
              <div className="w-full h-px bg-slate-100 my-2" />
              <button title="Home" className="text-slate-400 hover:text-slate-600"><Home className="w-5 h-5" /></button>
              <button title="My Day" className="text-slate-400 hover:text-slate-600"><MapPin className="w-5 h-5" /></button>
              <button onClick={() => alert("Messages coming soon ✉️") } title="Messages" className="text-slate-400 hover:text-slate-600"><MessageSquare className="w-5 h-5" /></button>
              <button onClick={() => setNotifOpen(true)} title="Notifications" className="text-slate-400 hover:text-slate-600 relative">
                <Bell className="w-5 h-5" />
                {tasks.some((t) => !t.done) && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500" />}
              </button>
              <button onClick={() => setShowSettings(true)} title="Settings" className="text-slate-400 hover:text-slate-600"><Settings className="w-5 h-5" /></button>
              <div className="flex-1" />
              <button onClick={() => alert("Logged out (demo)")} title="Logout" className="text-slate-300 hover:text-slate-500"><LogOut className="w-5 h-5" /></button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Hello, {name.split(' ')[0]}! <span className="align-middle">👋</span></h1>
                <p className="text-sm text-slate-400">Plan your day and track progress.</p>
              </div>
              <div className="flex items-center gap-3">
                {saveStatus && (
                  <div className={clsx(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                    saveStatus === "saving" && "bg-blue-50 text-blue-600",
                    saveStatus === "saved" && "bg-green-50 text-green-600",
                    saveStatus === "error" && "bg-red-50 text-red-600"
                  )}>
                    {saveStatus === "saving" && <Save className="w-3 h-3 animate-spin" />}
                    {saveStatus === "saved" && <Check className="w-3 h-3" />}
                    {saveStatus === "error" && "⚠️"}
                    <span>
                      {saveStatus === "saving" && "Saving..."}
                      {saveStatus === "saved" && "Saved"}
                      {saveStatus === "error" && "Save failed"}
                    </span>
                  </div>
                )}
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-3 py-2 rounded-xl bg-white ring-1 ring-slate-200 shadow-sm text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Search tasks..."
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-4 flex items-center gap-2">
              {[
                { k: "all", label: "All" },
                { k: "today", label: "Today" },
                { k: "pending", label: "Pending" },
                { k: "done", label: "Done" },
                { k: "high", label: "High Priority" },
              ].map((f) => (
                <button
                  key={f.k}
                  onClick={() => setFilter(f.k)}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs",
                    filter === f.k ? "bg-amber-500 text-white" : "bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Tracking / Progress */}
              <div className="col-span-8 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-700">Weekly Progress</div>
                    <div className="text-[11px] text-slate-400">Completed tasks per day</div>
                  </div>
                  <button className="text-xs flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">Weekly <ChevronDown className="w-4 h-4" /></button>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={week} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis hide domain={[0, Math.max(3, ...week.map((w) => w.value))]} />
                      <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }} />
                      <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="#e5f2d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats */}
              <div className="col-span-4 space-y-4">
                <StatCard icon={<Circle className="w-5 h-5 text-sky-500" />} label="Tasks Today" value={stats.totalToday} />
                <StatCard icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} label="Completed" value={stats.completed} />
                <StatCard icon={<Flag className="w-5 h-5 text-amber-600" />} label="Pending" value={stats.pending} />
              </div>

              {/* Add Task + List */}
              <div className="col-span-12">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-700">Tasks</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>Sorted by time</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{filtered.length} shown</div>
                  </div>
                  <TaskForm onAdd={addTask} />
                  <div className="mt-4"><TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} /></div>
                </div>
              </div>
            </div>
          </main>

          {/* Right panel */}
          <RightPanel selectedDate={selectedDate} setSelectedDate={setSelectedDate} agenda={agenda} name={name} setName={setName} profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        </div>
      </div>

      {/* Notifications */}
      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications">
        <div className="space-y-2 text-sm">
          {tasks.filter((t) => !t.done).slice(0, 5).map((t) => (
            <div key={t.id} className="rounded-xl bg-slate-50 p-2">Upcoming: <b>{t.title}</b> (due {t.due})</div>
          ))}
          {!tasks.some((t) => !t.done) && <div className="text-slate-400">You're all caught up! 🎉</div>}
        </div>
      </Modal>

      {/* Settings */}
      <Modal open={showSettings} onClose={() => setShowSettings(false)} title="Settings">
        <div className="space-y-4">
          {/* General Settings */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">General</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Show agenda in right panel
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Enable automatic saving
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Email reminders (demo)
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Data Management</h4>
            <div className="space-y-2">
              <button 
                onClick={exportData}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export All Data
              </button>
              
              <label className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer text-sm font-medium">
                <Upload className="w-4 h-4" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              
              <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
                <strong>💡 Tip:</strong> Export your data regularly to backup your tasks, profile, and settings. Import to restore or sync across devices.
              </div>
            </div>
          </div>

          {/* Storage Info */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Storage Info</h4>
            <div className="text-xs text-slate-500 space-y-1">
              <div>Tasks stored: {tasks.length}</div>
              <div>Profile name: {name}</div>
              <div>Profile picture: {profilePicture ? "Custom" : "Default"}</div>
              <div>Storage: Browser localStorage</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-right">
          <button 
            onClick={() => setShowSettings(false)} 
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}