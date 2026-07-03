import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import ConfirmModal from "../components/ConfirmModal";
import NoteContent from "../components/NoteContent";
import { ArrowLeftIcon, Columns2Icon, SearchIcon } from "lucide-react";
import api from "../lib/axios";

const NoteColumn = ({ slot, noteId, onPick }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(!!noteId);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/notes/").then((res) => setNotes(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      return;
    }
    setLoading(true);
    api
      .get(`/api/notes/${noteId}`)
      .then((res) => setNote(res.data))
      .catch(() => toast.error("Failed to load note"))
      .finally(() => setLoading(false));
  }, [noteId]);

  const handleDeleteConfirm = async () => {
    setConfirmDelete(false);
    try {
      await api.delete(`/api/notes/${noteId}`);
      toast.success("Note deleted");
      onPick(slot, null);
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel glass-highlight overflow-hidden flex flex-col min-h-[400px]">
      <div className="p-4 border-b border-base-content/6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
          <input
            type="text"
            placeholder="Pick a note for this column..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered input-sm w-full pl-9 glass-panel-subtle focus:border-primary/50 focus:outline-none"
          />
        </div>
        {search && (
          <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
            {filtered.slice(0, 8).map((n) => (
              <button
                key={n._id}
                onClick={() => {
                  onPick(slot, n._id);
                  setSearch("");
                }}
                className="block w-full text-left text-sm px-3 py-1.5 rounded-lg hover:bg-base-200/60 truncate"
              >
                {n.title}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-base-content/30 px-3 py-1.5">No matches</p>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-6 space-y-3 animate-pulse">
            <div className="h-6 w-2/3 bg-base-content/10 rounded" />
            <div className="h-4 w-full bg-base-content/6 rounded" />
            <div className="h-4 w-5/6 bg-base-content/6 rounded" />
          </div>
        )}

        {!loading && !note && (
          <div className="flex items-center justify-center h-full py-16 text-sm text-base-content/35">
            Search above to open a note here
          </div>
        )}

        {!loading && note && (
          <NoteContent note={note} onDeleteClick={() => setConfirmDelete(true)} compact />
        )}
      </div>

      <ConfirmModal
        isOpen={confirmDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDelete(false)}
        title="Delete this note?"
        message="This will permanently remove the note. You can't undo this."
        confirmLabel="Delete"
        confirmVariant="error"
      />
    </div>
  );
};

const SplitViewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const a = searchParams.get("a");
  const b = searchParams.get("b");

  const handlePick = (slot, id) => {
    const next = new URLSearchParams(searchParams);
    if (id) {
      next.set(slot, id);
    } else {
      next.delete(slot);
    }
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to notes
        </Link>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 ring-1 ring-primary/20">
            <Columns2Icon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-base-content">Split view</h1>
        </div>

        {/* below lg, split view doesn't make sense - point back to single view */}
        <div className="lg:hidden glass-panel p-8 text-center">
          <p className="text-sm text-base-content/50 mb-4">
            Split view needs a bigger screen. Try this on a laptop or larger display.
          </p>
          <Link to="/notes" className="btn btn-primary btn-sm">
            Back to notes
          </Link>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-4">
          <NoteColumn slot="a" noteId={a} onPick={handlePick} />
          <NoteColumn slot="b" noteId={b} onPick={handlePick} />
        </div>
      </main>
    </div>
  );
};

export default SplitViewPage;