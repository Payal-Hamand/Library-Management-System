import { BookIcon, CheckIcon } from "./Icons";

interface LeftPanelProps {
  headline: string;
  subheadline: string;
  features: string[];
}

const LeftPanel = ({ headline, subheadline, features }: LeftPanelProps) => (
  <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 flex-col justify-between p-12">
    {/* Grid background */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    {/* Glow orbs */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-teal-400/5 rounded-full blur-2xl pointer-events-none" />

    {/* Brand */}
    <div className="relative z-10 flex items-center gap-3">
      <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white">
        <BookIcon />
      </div>
      <span className="text-white font-bold text-xl tracking-tight">
        Library<span className="text-teal-400">MS</span>
      </span>
    </div>

    {/* Hero copy */}
    <div className="relative z-10">
      <p className="text-teal-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
        Library Management System
      </p>
      <h1
        className="text-white text-5xl font-bold leading-tight mb-5"
        dangerouslySetInnerHTML={{ __html: headline }}
      />
      <p className="text-slate-400 text-base leading-relaxed max-w-sm">{subheadline}</p>
    </div>

    {/* Feature list */}
    <div className="relative z-10 space-y-3">
      {features.map((f) => (
        <div key={f} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0 text-teal-400">
            <CheckIcon />
          </div>
          <span className="text-slate-400 text-sm">{f}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LeftPanel;
