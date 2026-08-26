import React, { useState, useEffect } from 'react';
import { Cpu, Key, Brain, Trash2 } from 'lucide-react';
import { fetchMemory, saveMemory, deleteMemoryItem } from '../services/api';

export default function Settings() {
  const [llmProvider, setLlmProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [memories, setMemories] = useState({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isSavingMemory, setIsSavingMemory] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadUserMemories();
  }, []);

  const loadUserMemories = async () => {
    try {
      const res = await fetchMemory();
      if (res.success) {
        setMemories(res.data);
      }
    } catch (err) {
      console.error('Failed to load memory context:', err);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;

    setIsSavingMemory(true);
    try {
      await saveMemory(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
      await loadUserMemories();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to save memory:', err);
    } finally {
      setIsSavingMemory(false);
    }
  };

  const handleDelete = async (key) => {
    try {
      await deleteMemoryItem(key);
      await loadUserMemories();
    } catch (err) {
      console.error('Failed to delete memory:', err);
    }
  };

  return (
    <div className="settings-container">
      {/* Page Header */}
      <div className="settings-header">
        <h1 className="settings-title">
          <Brain size={22} style={{ color: 'var(--accent-color)' }} />
          <span>Customise Assistant</span>
        </h1>
        <p className="settings-subtitle">
          Configure active model engines, API keys, and persistent context facts.
        </p>
      </div>

      {/* Model Selection Card */}
      <div className="settings-card">
        <label className="settings-label flex items-center gap-2">
          <Cpu size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Active Model Engine</span>
        </label>
        
        <div className="model-grid">
          <button
            type="button"
            onClick={() => setLlmProvider('gemini')}
            className={`model-option-btn ${llmProvider === 'gemini' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '18px' }}>🔵</div>
            <div className="model-option-title">Gemini 1.5 Flash</div>
            <div className="model-option-desc">Fast & optimized (Default)</div>
          </button>

          <button
            type="button"
            onClick={() => setLlmProvider('gpt')}
            className={`model-option-btn ${llmProvider === 'gpt' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '18px' }}>🟢</div>
            <div className="model-option-title">OpenAI GPT-4o</div>
            <div className="model-option-desc">High reasoning precision</div>
          </button>

          <button
            type="button"
            onClick={() => setLlmProvider('ollama')}
            className={`model-option-btn ${llmProvider === 'ollama' ? 'active' : ''}`}
          >
            <div style={{ fontSize: '18px' }}>🟣</div>
            <div className="model-option-title">Ollama (Local)</div>
            <div className="model-option-desc">Private local execution</div>
          </button>
        </div>
      </div>

      {/* API Key Card */}
      <div className="settings-card">
        <label className="settings-label">
          <Key size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Custom API Credentials</span>
        </label>
        
        <div className="input-field-wrapper">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-... (Leave empty to use server environment variables)"
            className="text-input"
          />
        </div>
      </div>

      {/* Persistent Memory Card */}
      <div className="settings-card">
        <label className="settings-label">
          <Brain size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Assistant Memory Bank</span>
        </label>
        
        <div className="memory-bank-wrapper">
          {/* Current Saved Memories */}
          <div className="memory-list custom-scrollbar">
            {Object.keys(memories).length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', padding: '20px 0' }}>
                No memory context stored yet. Add facts like role or company below.
              </p>
            ) : (
              Object.entries(memories).map(([k, v]) => (
                <div key={k} className="memory-item">
                  <div>
                    <span className="memory-key">{k.replace('_', ' ')}:</span>
                    <span className="memory-val">{v}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(k)}
                    className="btn-delete-memory"
                    title="Remove Fact"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add New Memory Entry */}
          <form onSubmit={handleAddMemory} className="add-memory-form">
            <input
              type="text"
              placeholder="Key (e.g. role)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="text-input"
              style={{ width: '30%' }}
            />
            <input
              type="text"
              placeholder="Value (e.g. Developer)"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="text-input"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              disabled={isSavingMemory}
              className="btn-save-fact"
            >
              {isSavingMemory ? 'Saving...' : 'Add Fact'}
            </button>
          </form>

          {saveSuccess && (
            <p className="save-success-txt">✅ Fact successfully saved to Memory!</p>
          )}
        </div>
      </div>
    </div>
  );
}