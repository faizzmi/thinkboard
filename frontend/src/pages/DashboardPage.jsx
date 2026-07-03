import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import MiniCalendar from "../components/MiniCalendar";
import { getDaysUntil, getPriorityColor } from "../lib/utils";
import { LayoutDashboardIcon, AlertTriangleIcon, ClockIcon, CheckCircle2Icon } from "lucide-react";
import api from "../lib/axios";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    api
      .get("/api/notes/dashboard/summary")
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredByDate = (list) => {
    if (!selectedDate) return list;
    return list.filter(
      (n) => new Date(n.deadline).toDateString() === selectedDate.toDateString()
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="h-8 w-48 bg-base-content/10 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-panel p-6 h-40 animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <LayoutDashboardIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-base-content">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel p-5">
            <p className="text-xs text-base-content/40 uppercase tracking-widest mb-1">Total notes</p>
            <p className="text-2xl font-bold text-base-content">{data.totalNotes}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs text-base-content/40 uppercase tracking-widest mb-1">Overdue</p>
            <p className="text-2xl font-bold text-error">{data.overdue.length}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-xs text-base-content/40 uppercase tracking-widest mb-2">Checklist progress</p>
            <div className="flex items-center gap-3">
              <div className="radial-progress text-primary text-xs" style={{ "--value": data.checklistProgress.percent, "--size": "2.5rem" }}>
                {data.checklistProgress.percent}%
              </div>
              <span className="text-xs text-base-content/50">
                {data.checklistProgress.done}/{data.checklistProgress.total} done
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <MiniCalendar
              markedDates={data.deadlineDates}
              selectedDate={selectedDate}
              onSelectDate={(d) =>
                setSelectedDate((prev) => (prev?.toDateString() === d.toDateString() ? null : d))
              }
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="btn btn-ghost btn-xs w-full"
              >
                Clear date filter
              </button>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            {data.overdue.length > 0 && (
              <section className="glass-panel p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-error mb-3">
                  <AlertTriangleIcon className="w-4 h-4" />
                  Overdue
                </h2>
                <ul className="space-y-2">
                  {filteredByDate(data.overdue).map((note) => (
                    <li key={note._id}>
                      <Link
                        to={`/note/${note._id}`}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-error/5 transition-colors"
                      >
                        <span className="text-sm text-base-content/80 truncate">{note.title}</span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className={`badge badge-${getPriorityColor(note.priority)} badge-xs`}>{note.priority}</span>
                          <span className="text-xs text-error font-mono">{getDaysUntil(note.deadline)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="glass-panel p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-base-content mb-3">
                <ClockIcon className="w-4 h-4 text-primary" />
                Upcoming (next 7 days)
              </h2>
              {filteredByDate(data.upcoming).length === 0 ? (
                <p className="text-sm text-base-content/40 px-3 py-2">Nothing due soon</p>
              ) : (
                <ul className="space-y-2">
                  {filteredByDate(data.upcoming).map((note) => (
                    <li key={note._id}>
                      <Link
                        to={`/note/${note._id}`}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-base-200/50 transition-colors"
                      >
                        <span className="text-sm text-base-content/80 truncate">{note.title}</span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className={`badge badge-${getPriorityColor(note.priority)} badge-xs`}>{note.priority}</span>
                          <span className="text-xs text-base-content/40 font-mono">{getDaysUntil(note.deadline)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="glass-panel p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-base-content mb-3">
                <CheckCircle2Icon className="w-4 h-4 text-success" />
                By type
              </h2>
              <div className="flex gap-3">
                {Object.entries(data.typeCounts).map(([type, count]) => (
                  <div key={type} className="flex-1 glass-panel-subtle p-3 text-center">
                    <p className="text-lg font-bold text-base-content">{count}</p>
                    <p className="text-xs text-base-content/40 capitalize">{type}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;