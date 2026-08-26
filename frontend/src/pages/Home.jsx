import React, { useState } from 'react';
import GeneratorPanel from '../components/GeneratorPanel';
import OutputDisplay from '../components/OutputDisplay';
import ThreeBackground from '../components/ThreeBackground';
import { generateContent } from '../services/api';
import { Sparkles } from 'lucide-react';

export default function Home({
  formData,
  setFormData,
  currentGeneration,
  setCurrentGeneration,
  isLoading,
  setIsLoading
}) {
  const [error, setError] = useState(null);

  const handleGenerate = async (payload) => {
    if (!payload.custom_prompt?.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);
    try {
      const response = await generateContent(payload);
      if (response.success) {
        setCurrentGeneration(response.data);
      } else {
        setError('Generation failed. Please try again.');
      }
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        'Unable to reach the server. Make sure the backend is running on port 8000.';
      setError(typeof message === 'string' ? message : 'Generation failed. Please try again.');
      console.error('Generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPredefined = (platform, type, tone, audience, prompt) => {
    setFormData({
      platform,
      content_type: type,
      tone,
      audience,
      length: 'medium',
      custom_prompt: prompt,
    });
  };

  const handleRefineComplete = (updatedGeneration) => {
    setCurrentGeneration(updatedGeneration);
  };

  const showGreeting = !currentGeneration;

  return (
    <div className="main-content" style={{ minHeight: '100%' }}>
      {/* 3D Background */}
      <ThreeBackground isLoading={isLoading} />

      <div className={`workspace-container ${showGreeting ? 'workspace-centered' : ''}`}>
        
        {/* Workspace Title / Greeting (Show only when no content is generated) */}
        {showGreeting && (
          <div className="greeting-section">
            <h1 className="greeting-title">What do you want to create today?</h1>
            <p className="greeting-subtitle">Clean, human-centered content generation powered by Gemini</p>
          </div>
        )}

        {/* Search Box / Generator Form */}
        <GeneratorPanel
          onGenerate={handleGenerate}
          isLoading={isLoading}
          formData={formData}
          setFormData={setFormData}
        />

        {error && (
          <div className="generation-error" role="alert">
            {error}
          </div>
        )}

        {/* Predefined Templates / Quick Actions (Show only when no content is generated) */}
        {showGreeting && (
          <div className="templates-section">
            <div className="templates-header">
              <Sparkles size={12} />
              <span>Select a quick template</span>
            </div>
            
            <div className="templates-grid">
              <div 
                className="template-card"
                onClick={() => handleSelectPredefined(
                  'linkedin', 
                  'post', 
                  'professional', 
                  'recruiters', 
                  'Sharing my reflections after completing my recent software development project.'
                )}
              >
                <div className="template-card-title">Professional Update</div>
                <div className="template-card-desc">Write an engaging, structured LinkedIn post describing project milestones.</div>
                <div className="template-card-meta">
                  <span className="template-tag">LinkedIn</span>
                  <span className="template-tag">Professional</span>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectPredefined(
                  'email', 
                  'cold_outreach', 
                  'confident', 
                  'developers', 
                  'Pitching our open-source React wrapper to developers for feedback.'
                )}
              >
                <div className="template-card-title">Cold Outreach Email</div>
                <div className="template-card-desc">Draft a concise, high-conversion cold email to prospects or collaborators.</div>
                <div className="template-card-meta">
                  <span className="template-tag">Email</span>
                  <span className="template-tag">Confident</span>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectPredefined(
                  'x', 
                  'post', 
                  'casual', 
                  'general', 
                  '3 lessons learned while transitioning from a monolithic backend to serverless APIs.'
                )}
              >
                <div className="template-card-title">Tech Thread on X</div>
                <div className="template-card-desc">Format a catchy, digestible thread discussing technical learning points.</div>
                <div className="template-card-meta">
                  <span className="template-tag">X (Twitter)</span>
                  <span className="template-tag">Casual</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Output Display */}
        {!showGreeting && (
          <OutputDisplay
            generation={currentGeneration}
            onRefineComplete={handleRefineComplete}
          />
        )}
        
      </div>
    </div>
  );
}