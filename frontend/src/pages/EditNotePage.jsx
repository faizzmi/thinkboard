import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import NoteMetadataFields from "../components/NoteMetadataFields";
import { SaveIcon, ArrowLeftIcon, TypeIcon, AlignLeftIcon, CalendarIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const emptyNote = {
    title: "",
    content: "",
    type: "note",
    priority: "medium",
    deadline: "",
    location: "",
    checklist: [],
  };

  const [note, setNote] = useState(emptyNote);
  const [original, setOriginal] = useState(emptyNote);
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const charLimit = 2000;
  const remaining = charLimit - note.content.length;

  const isDirty = JSON.stringify(note) !== JSON.stringify(original);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        const fetched = {
          title: res.data.title || "",
          content: res.data.content || "",
          type: res.data.type || "note",
          priority: res.data.priority || "medium",
          deadline: res.data.deadline ? res.data.deadline.slice(0, 16) : "",
          location: res.data.location || "",
          checklist: res.data.checklist || [],
        };
        setNote(fetched);
        setOriginal(fetched);
        setCreatedAt(res.data.createdAt);
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

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/api/notes/${id}`, {
        ...note,
        title: note.title.trim(),
        content: note.content.trim(),
        checklist: note.checklist
          .filter((item) => item.text.trim())
          .map(({ text, done }) => ({ text: text.trim(), done })),
      });
      toast.success("Changes saved!");
      navigate(`/note/${id}`);
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSave();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 sm:pb-8">
          <div className="h-5 w-32 bg-base-content/10 rounded mb-6 animate-pulse" />
          <div className="glass-panel p-6 sm:p-8 animate-pulse space-y-5">
            <div className="h-6 w-1/3 bg-base-content/10 rounded" />
            <div className="h-10 w-full bg-base-content/6 rounded-lg" />
            <div className="h-52 w-full bg-base-content/6 rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-28 sm:pb-8">
        <Link
          to={`/note/${id}`}
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to note
        </Link>

        <div className="glass-panel glass-highlight animate-slide-up">
          <div className="h-1 w-full bg-gradient-to-r from-warning/70 via-warning/30 to-transparent rounded-t-2xl" />

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-base-content">Edit note</h1>
                <p className="text-xs text-base-content/35 mt-0.5">
                  Changes won't be saved until you click Save
                </p>
              </div>
              {isDirty && (
                <span className="badge badge-warning badge-sm animate-fade-in">
                  Unsaved
                </span>
              )}
            </div>

            <div className="space-y-5 mb-5">
              <div className="form-control gap-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                  <TypeIcon className="w-3.5 h-3.5" />
                  Title
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200/50 focus:border-warning/50 focus:outline-none transition-colors"
                  placeholder="Note title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  onKeyDown={handleKeyDown}
                  maxLength={120}
                  autoFocus
                />
              </div>

              <div className="form-control gap-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                  <AlignLeftIcon className="w-3.5 h-3.5" />
                  Content
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-52 resize-none bg-base-200/50 focus:border-warning/50 focus:outline-none transition-colors leading-relaxed"
                  placeholder="Write your note here..."
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value.slice(0, charLimit) })
                  }
                  onKeyDown={handleKeyDown}
                />
                <p className={`text-xs text-right ${remaining < 100 ? "text-warning" : "text-base-content/25"}`}>
                  {remaining} characters remaining
                </p>
              </div>
            </div>

            <div className="border-t border-base-content/6 my-6" />

            <NoteMetadataFields note={note} setNote={setNote} />

            {createdAt && (
              <div className="flex items-center gap-1.5 mt-6 text-xs text-base-content/30">
                <CalendarIcon className="w-3.5 h-3.5" />
                Created {formatDate(new Date(createdAt))}
              </div>
            )}

            <div className="border-t border-base-content/6 my-6" />

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-base-content/25">
                <kbd className="kbd kbd-xs">Ctrl</kbd> +{" "}
                <kbd className="kbd kbd-xs">Enter</kbd> to save
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to={`/note/${id}`}
                  className="btn btn-ghost btn-sm flex-1 sm:flex-none"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSave}
                  className="btn btn-warning btn-sm flex-1 sm:flex-none gap-2 shadow-md shadow-warning/20 disabled:opacity-40"
                  disabled={saving || !isDirty || !note.title.trim() || !note.content.trim()}
                >
                  {saving ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4" />
                      Save changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditNotePage;