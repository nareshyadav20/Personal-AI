import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const [formData, setFormData] = useState({
    platform: "linkedin",
    content_type: "post",
    tone: "professional",
    audience: "general",
    length: "medium",
    custom_prompt: "",
  });

  const [currentGeneration, setCurrentGeneration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelectHistoryItem = (item) => {
    setCurrentGeneration(item);
    navigate("/");
  };

  const handleSelectTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      platform: template.platform || prev.platform,
      content_type: template.content_type || prev.content_type,
      tone: template.tone || prev.tone,
      audience: template.audience || prev.audience,
      custom_prompt: template.prompt_template || prev.custom_prompt,
    }));
    navigate("/");
  };

  const handleNewWorkspace = () => {
    setCurrentGeneration(null);
    setFormData({
      platform: "linkedin",
      content_type: "post",
      tone: "professional",
      audience: "general",
      length: "medium",
      custom_prompt: "",
    });
    navigate("/");
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Sidebar
                onSelectHistoryItem={handleSelectHistoryItem}
                onSelectTemplate={handleSelectTemplate}
                onNewWorkspace={handleNewWorkspace}
                currentGenId={currentGeneration?.id}
              />
              <main className="main-content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        formData={formData}
                        setFormData={setFormData}
                        currentGeneration={currentGeneration}
                        setCurrentGeneration={setCurrentGeneration}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
