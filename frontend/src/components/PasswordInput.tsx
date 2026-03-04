import { useState } from "react";
import { LockIcon, EyeIcon, EyeOffIcon, CheckIcon } from "./Icons";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Pass confirmOk/confirmBad for the confirm-password variant */
  confirmOk?: boolean;
  confirmBad?: boolean;
}

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  confirmOk,
  confirmBad,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const borderClass = confirmBad
    ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
    : confirmOk
    ? "border-teal-500/50 focus:ring-teal-500/40 focus:border-teal-500"
    : "border-slate-700 focus:ring-teal-500/40 focus:border-teal-500";

  return (
    <div>
      <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Left lock icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <LockIcon />
        </div>

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-800 border text-white placeholder-slate-500 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 transition ${borderClass}`}
        />

        {/* Right side: check mark + toggle */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {confirmOk && (
            <span className="text-teal-400">
              <CheckIcon />
            </span>
          )}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="text-slate-500 hover:text-teal-400 transition-colors"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
