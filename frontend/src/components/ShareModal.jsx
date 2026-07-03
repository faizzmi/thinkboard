import { useState } from "react";
import toast from "react-hot-toast";
import { CopyIcon, DownloadIcon, LinkIcon, XIcon } from "lucide-react";
import api from "../lib/axios";

const ShareModal = ({ isOpen, onClose, note, onShareChange }) => {
  const [toggling, setToggling] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !note) return null;

  const shareUrl = note.shareToken
    ? `${window.location.origin}/shared/${note.shareToken}`
    : null;

  const handleToggle = async () => {
    setToggling(true);
    try {
      const res = await api.put(`/api/notes/${note._id}/share`);
      onShareChange(res.data);
      toast.success(res.data.shareEnabled ? "Sharing enabled" : "Sharing disabled");
    } catch {
      toast.error("Failed to update sharing");
    } finally {
      setToggling(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied");
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const res = await api.get(`/api/notes/${note._id}/pdf`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${note.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      toast.error("Failed to export PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-base-300/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm glass-panel-strong glass-highlight animate-slide-up">
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-base-content">Share note</h2>
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">
              {note.shareEnabled ? "Sharing is on" : "Enable read-only link"}
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={note.shareEnabled}
              onChange={handleToggle}
              disabled={toggling}
            />
          </div>

          {note.shareEnabled && shareUrl && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 input input-bordered input-sm glass-panel-subtle overflow-hidden">
                <LinkIcon className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
                <span className="truncate text-xs text-ink-muted">{shareUrl}</span>
              </div>
              <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle" aria-label="Close">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="border-t border-base-content/6 pt-4">
            <button
              onClick={handleDownloadPdf}
              className="btn btn-outline btn-sm w-full gap-2"
              disabled={downloading}
            >
              {downloading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <>
                  <DownloadIcon className="w-4 h-4" />
                  Export as PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;