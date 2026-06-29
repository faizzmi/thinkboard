import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { PlusIcon, StickyNoteIcon, SearchIcon } from "lucide-react";
import api from "../lib/axios";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
      <div className="relative bg-base-100/60 backdrop-blur-sm p-6 rounded-2xl ring-1 ring-primary/15">
        <StickyNoteIcon className="w-12 h-12 text-primary/50" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-lg font-semibold text-base-content mb-2">No notes yet</h3>
    <p className="text-sm text-base-content/50 mb-6 text-center max-w-xs">
      Start capturing your thoughts. Your first note is one click away.
    </p>
    <Link to="/create" className="btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/20">
      <PlusIcon className="w-4 h-4" />
      Create your first note
    </Link>
  </div>
);

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null); // holds note id

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/notes/");
      console.log("response:", res.data);
      setNotes(Array.isArray(res.data) ? res.data : []);
      setIsRateLimited(false);
    } catch (error) {
      console.error("Error fetching notes", error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteRequest = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteConfirm = async () => {
    const id = confirmDelete;
    setConfirmDelete(null);
    try {
      await api.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <NavBar />

      <ConfirmModal
        isOpen={!!confirmDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDelete(null)}
        title="Delete this note?"
        message="This will permanently remove the note. You can't undo this."
        confirmLabel="Delete"
        confirmVariant="error"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!isRateLimited && !isLoading && notes.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 animate-slide-up">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-base-content">
                Your notes
                <span className="ml-2 text-sm font-normal text-base-content/40 font-mono">
                  ({notes.length})
                </span>
              </h2>
              <p className="text-sm text-base-content/45 mt-0.5">
                {notes.length === 1 ? "1 note saved" : `${notes.length} notes saved`}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered input-sm w-full pl-9 bg-base-100/60 backdrop-blur-sm focus:border-primary/50 focus:outline-none"
              />
            </div>
          </div>
        )}

        {isRateLimited && <RateLimitedUI onRetry={fetchNotes} />}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-base-content/8 bg-base-100/60 p-5 animate-pulse"
              >
                <div className="h-4 bg-base-content/10 rounded-lg mb-3 w-3/4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-base-content/6 rounded w-full" />
                  <div className="h-3 bg-base-content/6 rounded w-5/6" />
                  <div className="h-3 bg-base-content/6 rounded w-4/6" />
                </div>
                <div className="h-3 bg-base-content/6 rounded w-1/3 mt-6" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isRateLimited && notes.length === 0 && <EmptyState />}

        {!isLoading && !isRateLimited && notes.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-base-content/40 text-sm">
              No notes match <span className="text-primary">"{search}"</span>
            </p>
            <button
              onClick={() => setSearch("")}
              className="btn btn-ghost btn-xs mt-3 text-base-content/40"
            >
              Clear search
            </button>
          </div>
        )}

        {!isLoading && !isRateLimited && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDeleteRequest} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;