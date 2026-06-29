import { ZapIcon, RefreshCwIcon } from "lucide-react";

const RateLimitedUI = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="card bg-base-100/60 backdrop-blur-sm border border-base-content/8 shadow-xl max-w-sm w-full animate-fade-in">
        <div className="card-body items-center text-center gap-5 py-10">
          <div className="relative">
            <div className="absolute inset-0 bg-warning/20 rounded-full blur-xl animate-pulse-slow" />
            <div className="relative bg-warning/10 p-5 rounded-full ring-1 ring-warning/20">
              <ZapIcon className="w-10 h-10 text-warning" strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Slow down a bit</h2>
            <p className="text-sm text-base-content/60 leading-relaxed">
              You've hit the rate limit. Give it a moment and try again.
            </p>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="btn btn-warning btn-sm gap-2"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;