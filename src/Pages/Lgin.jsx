import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaSignInAlt, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { loginUser, registerUser, getRedirectPath } from "../data/authStore";

function AuthLogin() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setError(""); setSuccess("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const session = loginUser(email, password);
    if (session) navigate(getRedirectPath(session));
    else setError("Invalid email or password. Please try again.");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    const result = registerUser({ name, email, password });
    if (result.error) { setError(result.error); return; }
    setSuccess("Account created! You can now sign in.");
    setMode("login"); setPassword(""); setConfirmPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-primary/40 px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
          <FaArrowLeft size={12} /> Back to Shop
        </Link>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/30">E</div>
          <h1 className="font-heading text-3xl font-bold text-white"><span className="text-primary-light">Electro</span>Shop</h1>
          <p className="mt-2 text-sm text-slate-300">{mode === "login" ? "Sign in to your account" : "Create a new account"}</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-2xl shadow-black/20">
          <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
            {["login", "signup"].map((m) => (
              <button key={m} type="button" onClick={() => { setMode(m); resetForm(); }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition ${mode === m ? "bg-white text-primary shadow-sm" : "text-slate-500"}`}>
                {m === "login" ? <><FaSignInAlt size={14} /> Login</> : <><FaUserPlus size={14} /> Sign Up</>}
              </button>
            ))}
          </div>
          {error && <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">{error}</div>}
          {success && <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-600">{success}</div>}
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="relative mt-1">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="email" required className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative mt-1">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="password" required className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark">Sign In</button>
              <p className="text-center text-xs text-slate-400">Admin demo: admin@electroshop.com / admin123</p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              {[
                { label: "Full Name", key: "name", type: "text", icon: FaUser, placeholder: "Your name" },
                { label: "Email", key: "email", type: "email", icon: FaEnvelope, placeholder: "email@example.com" },
                { label: "Password", key: "password", type: "password", icon: FaLock, placeholder: "At least 6 characters" },
                { label: "Confirm Password", key: "confirmPassword", type: "password", icon: FaLock, placeholder: "Repeat password" },
              ].map(({ label, key, type, icon: Icon, placeholder }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-slate-700">{label}</label>
                  <div className="relative mt-1">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type={type} required placeholder={placeholder}
                      className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={key === "name" ? name : key === "email" ? email : key === "password" ? password : confirmPassword}
                      onChange={(e) => { const v = e.target.value; if (key === "name") setName(v); else if (key === "email") setEmail(v); else if (key === "password") setPassword(v); else setConfirmPassword(v); }} />
                  </div>
                </div>
              ))}
              <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
