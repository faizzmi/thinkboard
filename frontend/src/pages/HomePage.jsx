import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";
import { PlusIcon, StickyNoteIcon, SearchIcon, Loader2Icon } from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const PAGE_SIZE = 9;

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalNotes, setTotalNotes] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null); // holds note id
  const { user } = useAuth();

  const fetchNotes = useCallback(async (pageToFetch, { append = false } = {}) => {
    append ? setIsLoadingMore(true) : setLoading(true);
    try {
      const res = await api.get("/api/notes/", {
        params: { page: pageToFetch, limit: PAGE_SIZE },
      });
      const { notes: fetched, hasMore: more, totalNotes: total } = res.data;
      setNotes((prev) => (append ? [...prev, ...fetched] : fetched));
      setHasMore(more);
      setTotalNotes(total);
      setPage(pageToFetch);
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
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes(1);
  }, [fetchNotes]);

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    fetchNotes(page + 1, { append: true });
  };

  const handleDeleteRequest = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteConfirm = () => {
    const id = confirmDelete;
    setConfirmDelete(null);
  
    const deletedNote = notes.find((n) => n._id === id);
    if (!deletedNote) return;
  
    // Optimistic: remove from the list immediately, don't wait on the network
    setNotes((prev) => prev.filter((n) => n._id !== id));
    setTotalNotes((prev) => Math.max(prev - 1, 0));
  
    let undone = false;
    const undo = () => {
      undone = true;
      setNotes((prev) => [deletedNote, ...prev]);
      setTotalNotes((prev) => prev + 1);
    };
  
    toast((t) => (
      <span className="flex items-center gap-3">
        Note deleted
        <button
          className="btn btn-ghost btn-xs text-primary"
          onClick={() => {
            undo();
            toast.dismiss(t.id);
          }}
        >
          Undo
        </button>
      </span>
    ), { duration: 4000 });
  
    setTimeout(async () => {
      if (undone) return;
      try {
        await api.delete(`/api/notes/${id}`);
      } catch (error) {
        console.error("Error deleting note", error);
        undo();
        toast.error("Failed to delete note");
      }
    }, 4000);
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
        
      {!isRateLimited && !isLoading && totalNotes > 0 && (
        <div className="mb-8 animate-slide-up">
          {user && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-base-content">
                {user.name}'s Notes
                <span className="ml-2 text-sm font-normal text-base-content/40 font-mono">
                  ({totalNotes})
                </span>
              </h2>
              <p className="text-sm text-base-content/45 mt-0.5">
                {totalNotes === 1 ? "1 note saved" : `${totalNotes} notes saved`}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered input-sm w-full pl-9 glass-panel-subtle focus:border-primary/50 focus:outline-none"
              />
            </div>

            <Link
              to="/create"
              className="btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 w-full sm:w-auto"
            >
              <PlusIcon className="w-4 h-4" />
              New Note
            </Link>
          </div>
          )}
        </div>
      )}

        {isRateLimited && <RateLimitedUI onRetry={() => fetchNotes(1)} />}

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

        {!isLoading && !isRateLimited && totalNotes === 0 && <EmptyState />}

        {!isLoading && !isRateLimited && totalNotes > 0 && filtered.length === 0 && (
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={handleDeleteRequest} />
              ))}
            </div>

            {!search && hasMore && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleLoadMore}
                  className="btn btn-outline btn-sm gap-2 min-w-40"
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load ${Math.min(PAGE_SIZE, totalNotes - notes.length)} more`
                  )}
                </button>
              </div>
            )}

            {!search && !hasMore && notes.length > PAGE_SIZE && (
              <p className="text-center text-xs text-base-content/30 pt-4">
                You've reached the end — {totalNotes} notes total
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;