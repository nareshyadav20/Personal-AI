import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Simple in-browser user store (persisted in localStorage)
const USERS_KEY = "pa_users";
const SESSION_KEY = "pa_session";

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  });

  function signup(name, email, password) {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser = { id: Date.now(), name, email, password };
    saveUsers([...users, newUser]);
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }

  function login(email, password) {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: "Invalid email or password." };
    }
    const session = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
