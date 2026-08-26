import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';

function AppContent() {
  const [formData, setFormData] = useState({
    platform: 'linkedin',
    content_type: 'post',
    tone: 'professional',
    audience: 'general',
    length: 'medium',
    custom_prompt: '',
  });

  const [currentGeneration, setCurrentGeneration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectHistoryItem = (item) => {
    setCurrentGeneration(item);
    navigate('/');
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
    navigate('/');
  };

  const handleNewWorkspace = () => {
    setCurrentGeneration(null);
    setFormData({
      platform: 'linkedin',
      content_type: 'post',
      tone: 'professional',
      audience: 'general',
      length: 'medium',
      custom_prompt: '',
    });
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Global Left Navigation Sidebar */}
      <Sidebar
        onSelectHistoryItem={handleSelectHistoryItem}
        onSelectTemplate={handleSelectTemplate}
        onNewWorkspace={handleNewWorkspace}
        currentGenId={currentGeneration?.id}
      />

      {/* Main Content Area */}
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
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}