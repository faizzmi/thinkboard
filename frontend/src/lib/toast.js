import toast from "react-hot-toast";

const base = {
  duration: 3000,
  style: {
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
  },
};

export const toastSuccess = (msg) =>
  toast.success(msg, { ...base, style: { ...base.style, background: "#16a34a" } });

export const toastError = (msg) =>
  toast.error(msg, { ...base, style: { ...base.style, background: "#dc2626" } });

export const toastInfo = (msg) =>
  toast(msg, { ...base, style: { ...base.style, background: "#2563eb" } });

export const toastWarning = (msg) =>
  toast(msg, { ...base, style: { ...base.style, background: "#ca8a04", color: "#1a1a1a" } });