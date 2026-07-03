import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon, CalendarIcon, ClockIcon, CalendarClockIcon, MapPinIcon } from "lucide-react";
import { formatDate, isOverdue } from "../lib/utils";

const NoteContent = ({ note, onDeleteClick, compact = false, readOnly = false }) => {
  if (!note) return null;

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

      <div className={compact ? "p-5" : "p-6 sm:p-8"}>
        <h1 className={`font-bold text-base-content leading-snug mb-3 ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>
          {note.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-base-content/35 mb-6">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            Created {formatDate(new Date(note.createdAt))}
          </span>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <span className="flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5" />
              Edited {formatDate(new Date(note.updatedAt))}
            </span>
          )}
        </div>

        <div className="border-t border-base-content/6 mb-6" />

        <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
          {note.content}
        </p>
      </div>

      {(note.deadline || note.location || note.checklist?.length > 0) && (
        <div className={`border-t border-base-content/6 pt-5 space-y-4 ${compact ? "px-5" : "px-6 sm:px-8"}`}>
          {note.deadline && (
            <div className={`flex items-center gap-2 text-sm ${isOverdue(note.deadline) ? "text-error" : "text-base-content/60"}`}>
              <CalendarClockIcon className="w-4 h-4" />
              {isOverdue(note.deadline) ? "Overdue: " : "Due "}
              {new Date(note.deadline).toLocaleString()}
            </div>
          )}
          {note.location && (
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <MapPinIcon className="w-4 h-4" />
              {note.location}
            </div>
          )}
          {note.checklist?.length > 0 && (
            <div className="space-y-1.5">
              {note.checklist.map((item, i) => (
                <label key={item._id || i} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-xs" checked={item.done} readOnly />
                  <span className={item.done ? "line-through text-base-content/40" : "text-base-content/80"}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {!readOnly && (
        <div className={compact ? "px-5 pb-5 pt-2" : "px-6 sm:px-8 pb-6 sm:pb-8 pt-2"}>
          <div className="border-t border-base-content/6 pt-5 flex items-center justify-between gap-3">
            <span className="text-xs text-base-content/25 font-mono">
              {note.content.length} chars
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onDeleteClick}
                className="btn btn-ghost btn-sm gap-2 text-base-content/40 hover:text-error hover:bg-error/10"
              >
                <Trash2Icon className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
              <Link
                to={`/note/edit/${note._id}`}
                className="btn btn-primary btn-sm gap-2 shadow-md shadow-primary/20"
              >
                <PenSquareIcon className="w-4 h-4" />
                Edit note
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteContent;