import { PenSquareIcon, Trash2Icon, CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(note._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    // Navigation is handled by the Link wrapper
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group flex flex-col glass-panel p-5 hover:border-primary/30 hover:bg-base-100/80 hover:shadow-glass-lg transition-all duration-200 ease-glass animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h2 className="font-semibold text-base-content leading-snug line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-200">
          {note.title}
        </h2>
        {/* Dot accent */}
        <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 flex-shrink-0 group-hover:bg-primary transition-colors duration-200" />
      </div>

      {/* Content preview */}
      <p className="text-sm text-base-content/55 line-clamp-3 leading-relaxed flex-1 mb-4">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-base-content/6">
        <div className="flex items-center gap-1.5 text-xs text-base-content/35">
          <CalendarIcon className="w-3 h-3" />
          <span>{formatDate(new Date(note.createdAt))}</span>
        </div>

        {/* Actions - visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="btn btn-ghost btn-xs gap-1 text-base-content/50 hover:text-info hover:bg-info/10"
            title="Edit note"
          >
            <PenSquareIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-xs gap-1 text-base-content/50 hover:text-error hover:bg-error/10"
            title="Delete note"
          >
            <Trash2Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;