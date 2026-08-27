import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
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
              <path d="M10 18.5L15 23.5L26 12.5" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="auth-title">Personal Assistant</h1>
          <p className="auth-subtitle">Welcome back — sign in to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
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
            <label className="auth-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            id="login-submit"
            className={"auth-btn" + (loading ? " auth-btn--loading" : "")}
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="auth-link">Create one</Link>
        </p>
      </div>
    </div>
  );
}
