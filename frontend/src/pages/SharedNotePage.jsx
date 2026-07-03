import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NoteContent from "../components/NoteContent";
import { BookOpenIcon } from "lucide-react";
import api from "../lib/axios";

const SharedNotePage = () => {
  const { token } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/public/notes/${token}`)
      .then((res) => setNote(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass-nav">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 ring-1 ring-primary/20">
              <BookOpenIcon className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold font-mono tracking-tight text-base-content">
              Think<span className="text-primary">Board</span>
            </span>
            <span className="badge badge-ghost badge-sm ml-2">Read-only</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {loading && (
          <div className="glass-panel p-8 animate-pulse space-y-4">
            <div className="h-7 w-2/3 bg-base-content/10 rounded" />
            <div className="h-4 w-full bg-base-content/6 rounded" />
          </div>
        )}

        {!loading && error && (
          <div className="glass-panel p-8 text-center space-y-3">
            <p className="text-sm text-base-content/60">
              This link is invalid or sharing has been turned off.
            </p>
            <Link to="/" className="btn btn-primary btn-sm">
              Go to ThinkBoard
            </Link>
          </div>
        )}

        {!loading && note && (
          <article className="glass-panel glass-highlight overflow-hidden">
            <NoteContent note={note} readOnly />
          </article>
        )}
      </main>
    </div>
  );
};

export default SharedNotePage;