import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmModal";
import ShareModal from "../components/ShareModal";
import NoteContent from "../components/NoteContent";
import { ArrowLeftIcon, Share2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        toast.error("Failed to load note");
        navigate("/notes");
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
      navigate("/notes");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 sm:pb-8">
          <div className="h-5 w-32 bg-base-content/10 rounded mb-6 animate-pulse" />
          <div className="glass-panel p-6 sm:p-8 animate-pulse space-y-4">
            <div className="h-7 w-2/3 bg-base-content/10 rounded" />
            <div className="h-3 w-1/3 bg-base-content/6 rounded" />
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

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        note={note}
        onShareChange={(data) => setNote({ ...note, ...data })}
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 sm:pb-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to notes
          </Link>
          <button
            onClick={() => setShowShare(true)}
            className="btn btn-ghost btn-sm gap-2"
          >
            <Share2Icon className="w-4 h-4" />
            Share
          </button>
        </div>

        <article className="glass-panel glass-highlight animate-slide-up overflow-hidden">
          <NoteContent note={note} onDeleteClick={() => setShowConfirm(true)} />
        </article>
      </main>
    </div>
  );
};

export default NoteDetailPage;