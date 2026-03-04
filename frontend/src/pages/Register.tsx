import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import LeftPanel from "../components/LeftPanel";
import PasswordInput from "../components/PasswordInput";
import Alert from "../components/Alert";
import { BookIcon, UserIcon, MailIcon, KeyIcon, ArrowIcon, SpinnerIcon } from "../components/Icons";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
   
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: e.target.value });
    setError("");
  };

  const validate = (): string | null => {
    if (!form.username.trim()) return "Username is required.";
    if (form.username.length < 3) return "Username must be at least 3 characters.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", {
        username: form.username,
        password: form.password,
      });
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/"), 1800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const getStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 4) return { label: "Weak", color: "bg-red-500", tw: "text-red-400", w: "w-1/4" };
    if (p.length < 6) return { label: "Fair", color: "bg-orange-500", tw: "text-orange-400", w: "w-2/4" };
    if (p.length < 10) return { label: "Good", color: "bg-yellow-500", tw: "text-yellow-400", w: "w-3/4" };
    return { label: "Strong", color: "bg-teal-500", tw: "text-teal-400", w: "w-full" };
  };
  const strength = getStrength();
  const confirmOk = !!form.confirmPassword && form.password === form.confirmPassword;
  const confirmBad = !!form.confirmPassword && form.password !== form.confirmPassword;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <LeftPanel
        headline={`Start your<br/>reading<br/><span class="text-teal-400">journey.</span>`}
        subheadline="Create your account and get instant access to thousands of books. Borrow, track, and manage your reading list effortlessly."
        features={[
        
        ]}
      />

      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-4">

         
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <BookIcon />
            </div>
            <span className="text-white font-bold text-lg">
              Library<span className="text-teal-400">MS</span>
            </span>
          </div>

          <h2 className="text-white text-3xl font-bold mb-1">Create account</h2>
          <p className="text-slate-400 text-sm mb-7">Fill in the details below to get started</p>

          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-4">

           
            <div>
              <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. john_doe"
                  value={form.username}
                  onChange={set("username")}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition"
                />
              </div>
            </div>

         <div>
              <PasswordInput
                label="Password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set("password")}
              />
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.w}`} />
                  </div>
                  <p className={`text-xs mt-1 font-medium ${strength.tw}`}>{strength.label} password</p>
                </div>
              )}
            </div>

            
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              confirmOk={confirmOk}
              confirmBad={confirmBad}
            />

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-all mt-2"
            >
              {loading ? (
                <><SpinnerIcon /> Creating account…</>
              ) : (
                <><span>Create Account</span><ArrowIcon /></>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

          <p className="text-center text-slate-600 text-xs mt-4">
            © 2026 Library Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
