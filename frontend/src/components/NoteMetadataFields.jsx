import { PlusIcon, XIcon, MapPinIcon, CalendarClockIcon, ListChecksIcon } from "lucide-react";

const TYPES = ["note", "task", "event"];
const PRIORITIES = ["low", "medium", "high"];

const NoteMetadataFields = ({ note, setNote }) => {
  const updateChecklistItem = (id, changes) => {
    setNote({
      ...note,
      checklist: note.checklist.map((item) =>
        item._id === id || item.tempId === id ? { ...item, ...changes } : item
      ),
    });
  };

  const addChecklistItem = () => {
    setNote({
      ...note,
      checklist: [...note.checklist, { tempId: crypto.randomUUID(), text: "", done: false }],
    });
  };

  const removeChecklistItem = (id) => {
    setNote({
      ...note,
      checklist: note.checklist.filter((item) => item._id !== id && item.tempId !== id),
    });
  };

  return (
    <div className="space-y-5">
      {/* type */}
      <div className="form-control gap-2">
        <label className="text-xs font-semibold text-ink-muted uppercase tracking-widest">
          Type
        </label>
        <div className="join">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setNote({ ...note, type: t })}
              className={`join-item btn btn-sm capitalize ${note.type === t ? "btn-primary" : "btn-ghost"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* priority */}
      <div className="form-control gap-2">
        <label className="text-xs font-semibold text-ink-muted uppercase tracking-widest">
          Priority
        </label>
        <div className="join">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setNote({ ...note, priority: p })}
              className={`join-item btn btn-sm capitalize ${note.priority === p ? "btn-primary" : "btn-ghost"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* deadline */}
      <div className="form-control gap-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
          <CalendarClockIcon className="w-3.5 h-3.5" />
          Deadline
        </label>
        <input
          type="datetime-local"
          className="input input-bordered w-full glass-panel-subtle focus:border-primary/50 focus:outline-none"
          value={note.deadline || ""}
          onChange={(e) => setNote({ ...note, deadline: e.target.value })}
        />
      </div>

      {/* location */}
      <div className="form-control gap-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
          <MapPinIcon className="w-3.5 h-3.5" />
          Location
        </label>
        <input
          type="text"
          placeholder="Optional"
          className="input input-bordered w-full glass-panel-subtle focus:border-primary/50 focus:outline-none"
          value={note.location}
          onChange={(e) => setNote({ ...note, location: e.target.value })}
        />
      </div>

      {/* checklist */}
      <div className="form-control gap-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-widest">
          <ListChecksIcon className="w-3.5 h-3.5" />
          Checklist
        </label>
        <div className="space-y-2">
          {note.checklist.map((item) => {
            const id = item._id || item.tempId;
            return (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={item.done}
                  onChange={(e) => updateChecklistItem(id, { done: e.target.checked })}
                />
                <input
                  type="text"
                  className="input input-bordered input-sm flex-1 glass-panel-subtle focus:border-primary/50 focus:outline-none"
                  placeholder="Checklist item"
                  value={item.text}
                  onChange={(e) => updateChecklistItem(id, { text: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeChecklistItem(id)}
                  className="btn btn-ghost btn-xs btn-circle text-ink-subtle hover:text-error"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addChecklistItem}
            className="btn btn-ghost btn-xs gap-1 text-primary"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteMetadataFields;