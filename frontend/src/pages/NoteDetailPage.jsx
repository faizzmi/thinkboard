import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmModal";
import { ArrowLeftIcon, PenSquareIcon, Trash2Icon, CalendarIcon, ClockIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDeleteConfirm = async () => {
    setShowConfirm(false);
    try {
      await api.delete(`/api/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="h-5 w-32 bg-base-content/10 rounded mb-6 animate-pulse" />
          <div className="rounded-2xl border border-base-content/8 bg-base-100/60 p-6 sm:p-8 animate-pulse space-y-4">
            <div className="h-7 w-2/3 bg-base-content/10 rounded" />
            <div className="h-3 w-1/3 bg-base-content/6 rounded" />
            <div className="border-t border-base-content/6 my-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-base-content/6 rounded" />
              <div className="h-4 w-5/6 bg-base-content/6 rounded" />
              <div className="h-4 w-4/6 bg-base-content/6 rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen">
      <NavBar />

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
        title="Delete this note?"
        message="This will permanently remove the note. You can't undo this."
        confirmLabel="Delete"
        confirmVariant="error"
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to notes
        </Link>

        <article className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 animate-slide-up overflow-hidden">

          <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content leading-snug mb-3">
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

          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
            <div className="border-t border-base-content/6 pt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-base-content/25 font-mono">
                {note.content.length} chars
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="btn btn-ghost btn-sm gap-2 text-base-content/40 hover:text-error hover:bg-error/10"
                >
                  <Trash2Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
                <Link
                  to={`/note/edit/${id}`}
                  className="btn btn-primary btn-sm gap-2 shadow-md shadow-primary/20"
                >
                  <PenSquareIcon className="w-4 h-4" />
                  Edit note
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default NoteDetailPage;