import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import { SaveIcon, ArrowLeftIcon, TypeIcon, AlignLeftIcon } from "lucide-react";
import api from "../lib/axios";

const CreatePage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const charLimit = 2000;
  const remaining = charLimit - note.content.length;

  const handleCreate = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Both title and content are required");
      return;
    }

    setSaving(true);
    try {
      await api.post("/api/notes/", {
        title: note.title.trim(),
        content: note.content.trim(),
      });
      toast.success("Note created!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Rate limit reached. Please wait.");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-base-content/45 hover:text-base-content transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to notes
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-base-content/8 bg-base-100/60 backdrop-blur-sm shadow-xl shadow-base-content/5 animate-slide-up">
          <div className="p-6 sm:p-8">
            <h1 className="text-xl font-bold text-base-content mb-6">
              New note
            </h1>

            <div className="space-y-5">
              {/* Title field */}
              <div className="form-control gap-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                  <TypeIcon className="w-3.5 h-3.5" />
                  Title
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200/50 focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Give your note a title..."
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  maxLength={120}
                />
              </div>

              {/* Content field */}
              <div className="form-control gap-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-base-content/50 uppercase tracking-widest">
                  <AlignLeftIcon className="w-3.5 h-3.5" />
                  Content
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-52 resize-none bg-base-200/50 focus:border-primary/50 focus:outline-none transition-colors leading-relaxed"
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

            {/* Divider */}
            <div className="border-t border-base-content/6 my-6" />

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-base-content/25">
                Tip: Press <kbd className="kbd kbd-xs">Ctrl</kbd> +{" "}
                <kbd className="kbd kbd-xs">Enter</kbd> to save
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link to="/" className="btn btn-ghost btn-sm flex-1 sm:flex-none">
                  Cancel
                </Link>
                <button
                  onClick={handleCreate}
                  className="btn btn-primary btn-sm flex-1 sm:flex-none gap-2 shadow-md shadow-primary/20"
                  disabled={saving || !note.title.trim() || !note.content.trim()}
                >
                  {saving ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <>
                      <SaveIcon className="w-4 h-4" />
                      Save note
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

export default CreatePage;