import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup(form.name, form.email, form.password);
      setLoading(false);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    }, 600);
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
      <div className="auth-blob auth-blob-3" />

      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="var(--accent-color)" fillOpacity="0.15" />
              <path d="M18 10v16M10 18h16" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your AI assistant journey today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              className="auth-input"
              type="text"
              name="name"
              placeholder="Jane Doe"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password">Password</label>
            <div className="auth-password-wrapper">
              <input
                id="signup-password"
                className="auth-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-confirm">Confirm Password</label>
            <div className="auth-password-wrapper">
              <input
                id="signup-confirm"
                className="auth-input"
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="........"
                autoComplete="new-password"
                value={form.confirm}
                onChange={handleChange}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            id="signup-submit"
            className={"auth-btn" + (loading ? " auth-btn--loading" : "")}
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
