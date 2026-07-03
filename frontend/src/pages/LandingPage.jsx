import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  CheckSquareIcon,
  CalendarClockIcon,
  MapPinIcon,
  ListChecksIcon,
  Share2Icon,
  Columns2Icon,
  ArrowRightIcon,
  FlagIcon,
} from "lucide-react";

const THEMES = ["light", "dark", "cyberpunk", "retro", "forest", "luxury", "nord"];

const stackCards = [
  {
    label: "Task",
    title: "Ship the field report",
    icon: CheckSquareIcon,
    rotate: -10,
    x: -80,
    y: -10,
    accent: "#6366F1",
  },
  {
    label: "Event",
    title: "Sprint planning",
    icon: CalendarClockIcon,
    rotate: -3,
    x: -20,
    y: 20,
    accent: "#67E8F9",
  },
  {
    label: "Checklist",
    title: "Farm visit prep",
    icon: ListChecksIcon,
    rotate: 5,
    x: 40,
    y: -5,
    accent: "#F5A524",
  },
  {
    label: "Note",
    title: "NDVI scoring ideas",
    icon: FlagIcon,
    rotate: 12,
    x: 100,
    y: 25,
    accent: "#6366F1",
  },
];

const features = [
  {
    icon: CheckSquareIcon,
    title: "Type your notes",
    desc: "Mark something as a note, task, or event so your list reflects how you actually work.",
  },
  {
    icon: FlagIcon,
    title: "Set priority",
    desc: "Low, medium, high. Know what actually needs attention today.",
  },
  {
    icon: CalendarClockIcon,
    title: "Track deadlines",
    desc: "Overdue items surface themselves. No digging through old notes to find what slipped.",
  },
  {
    icon: MapPinIcon,
    title: "Attach a location",
    desc: "Farm visit, dentist, client meeting. Keep the where next to the what.",
  },
  {
    icon: ListChecksIcon,
    title: "Break it into steps",
    desc: "Checklists live inside the note itself, with progress tracked automatically.",
  },
  {
    icon: Share2Icon,
    title: "Share or export",
    desc: "Send a read-only link, or export any note as a clean PDF.",
  },
];

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen overflow-x-hidden">
      {/* ambient background */}
      <div
        className="landing-glow w-[500px] h-[500px] -top-40 -left-40"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", opacity: 0.25 }}
      />
      <div
        className="landing-glow w-[400px] h-[400px] top-1/3 -right-32"
        style={{ background: "radial-gradient(circle, #67E8F9 0%, transparent 70%)", opacity: 0.15 }}
      />

      {/* nav */}
      <header className="relative z-20 sticky top-0 border-b border-white/5 bg-[#0B0C12]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-400/20">
                <BookOpenIcon className="w-4 h-4 text-indigo-400" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight">
                Think<span className="text-indigo-400">Board</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm text-white/70 hover:text-white">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-sm bg-indigo-500 hover:bg-indigo-400 text-white border-none">
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
            A notes app with structure
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Notes that hold<br />their shape.
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
            Every note can carry a type, a priority, a deadline, and a checklist.
            Nothing gets lost in a wall of plain text again.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="btn bg-indigo-500 hover:bg-indigo-400 text-white border-none gap-2"
            >
              Get started free
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn btn-ghost text-white/70 hover:text-white">
              Log in
            </Link>
          </div>
        </div>

        {/* signature: the stack */}
        <div className="relative h-[360px] hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            {stackCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="landing-stack-card"
                  style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg)`,
                    zIndex: i,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{ background: `${card.accent}22` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: card.accent }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/85 font-medium leading-snug">
                    {card.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="mb-12 max-w-lg">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Every note carries more than text.
          </h2>
          <p className="text-white/50 text-sm sm:text-base">
            Metadata isn't an afterthought bolted onto a text box. It's built into how a note works.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="landing-card p-6">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-400/20 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* dashboard callout */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="landing-card p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              One place to see what's due.
            </h2>
            <p className="text-white/50 text-sm sm:text-base mb-6 leading-relaxed">
              The dashboard pulls deadlines, overdue items, and checklist progress
              out of your notes automatically. No extra setup.
            </p>
            <Link to="/signup" className="btn btn-sm bg-indigo-500 hover:bg-indigo-400 text-white border-none gap-2">
              See it for yourself
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="landing-card p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Overdue</p>
              <p className="text-2xl font-bold text-red-400">3</p>
            </div>
            <div className="landing-card p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-white">7</p>
            </div>
            <div className="landing-card p-4 col-span-2">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-2">Checklist progress</p>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-indigo-400 rounded-full" style={{ width: "64%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* themes */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="mb-8 max-w-lg">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Looks the way you want it to.
          </h2>
          <p className="text-white/50 text-sm sm:text-base">
            12 themes built in. Switch anytime from settings.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {THEMES.map((t) => (
            <div key={t} data-theme={t} className="landing-card overflow-hidden flex">
              <span className="w-3 h-10 bg-base-200" />
              <span className="w-3 h-10 bg-primary" />
              <span className="w-3 h-10 bg-secondary" />
              <span className="w-3 h-10 bg-accent" />
              <span className="px-3 flex items-center text-xs text-base-content capitalize bg-base-100">
                {t}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* split view + share callout strip */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 grid sm:grid-cols-2 gap-4">
        <div className="landing-card p-6">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-400/20 flex items-center justify-center mb-4">
            <Columns2Icon className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white mb-1.5">Split view</h3>
          <p className="text-sm text-white/45 leading-relaxed">
            Open two notes side by side on a laptop screen or larger, for comparing or cross-referencing.
          </p>
        </div>
        <div className="landing-card p-6">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/15 ring-1 ring-indigo-400/20 flex items-center justify-center mb-4">
            <Share2Icon className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white mb-1.5">Share a note</h3>
          <p className="text-sm text-white/45 leading-relaxed">
            Turn on a read-only link for anyone, or export a note as a PDF to send along.
          </p>
        </div>
      </section>

      {/* final cta */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Start capturing your thoughts.
        </h2>
        <p className="text-white/50 mb-8">Free to use. No credit card required.</p>
        <Link
          to="/signup"
          className="btn btn-lg bg-indigo-500 hover:bg-indigo-400 text-white border-none gap-2"
        >
          Create your account
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

      {/* footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30 font-mono">
          <span>ThinkBoard</span>
          <span>Built by Faiz</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;