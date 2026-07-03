import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const MiniCalendar = ({ markedDates = [], selectedDate, onSelectDate }) => {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const markedSet = new Set(
    markedDates.map((d) => new Date(d).toDateString())
  );

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrev = () => setViewDate(new Date(year, month - 1, 1));
  const goNext = () => setViewDate(new Date(year, month + 1, 1));

  const isMarked = (day) => {
    const dateStr = new Date(year, month, day).toDateString();
    return markedSet.has(dateStr);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return new Date(year, month, day).toDateString() === new Date(selectedDate).toDateString();
  };

  const isToday = (day) => {
    return new Date(year, month, day).toDateString() === new Date().toDateString();
  };

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={goPrev} className="btn btn-ghost btn-xs btn-circle">
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-base-content">
          {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button onClick={goNext} className="btn btn-ghost btn-xs btn-circle">
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-base-content/35 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              onClick={() => onSelectDate(new Date(year, month, day))}
              className={`aspect-square rounded-lg text-xs flex items-center justify-center relative transition-colors
                ${isSelected(day) ? "bg-primary text-primary-content" : "hover:bg-base-200/60"}
                ${isToday(day) && !isSelected(day) ? "ring-1 ring-primary/40" : ""}
              `}
            >
              {day}
              {isMarked(day) && !isSelected(day) && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MiniCalendar;