import React, { useState, useEffect } from 'react';
import { fetchMemory, saveMemory } from '../services/api';

export default function Settings({ isOpen, onClose }) {
  const [llmProvider, setLlmProvider] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [memories, setMemories] = useState({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isSavingMemory, setIsSavingMemory] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadUserMemories();
    }
  }, [isOpen]);

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
      await saveMemory(newKey, newValue);
      setNewKey('');
      setNewValue('');
      await loadUserMemories();
    } catch (err) {
      console.error('Failed to save memory:', err);
    } finally {
      setIsSavingMemory(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>⚙️</span> Ghostwriter Settings & Memory
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 custom-scrollbar text-xs">
          {/* LLM Provider Selection */}
          <div className="space-y-3">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              LLM Model Provider
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLlmProvider('gemini')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  llmProvider === 'gemini'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-base mb-1">🔵</div>
                Gemini 1.5
              </button>

              <button
                type="button"
                onClick={() => setLlmProvider('gpt')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  llmProvider === 'gpt'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-base mb-1">🟢</div>
                GPT-4o
              </button>

              <button
                type="button"
                onClick={() => setLlmProvider('ollama')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  llmProvider === 'ollama'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-base mb-1">🟣</div>
                Ollama Local
              </button>
            </div>
          </div>

          {/* Optional API Key Input */}
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Custom API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Leave blank to use system environment keys"
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg p-2.5 text-xs text-slate-200 outline-none"
            />
          </div>

          <hr className="border-slate-800" />

          {/* ChatGPT Style Persistent Memory Manager */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                🧠 Persistent Memory Bank
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Saved facts are automatically injected into all future content generations.
              </p>
            </div>

            {/* Current Memories */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2 max-h-36 overflow-y-auto">
              {Object.keys(memories).length === 0 ? (
                <p className="text-[11px] text-slate-500 text-center py-2">
                  No memory facts saved yet. Add one below!
                </p>
              ) : (
                Object.entries(memories).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800/80 text-[11px]"
                  >
                    <span className="font-semibold text-purple-300 capitalize">
                      {k.replace('_', ' ')}:
                    </span>
                    <span className="text-slate-300 truncate max-w-[200px]">{v}</span>
                  </div>
                ))
              )}
            </div>

            {/* Add New Memory */}
            <form onSubmit={handleAddMemory} className="flex gap-2">
              <input
                type="text"
                placeholder="Key (e.g. startup)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-1/3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg p-2 text-xs text-slate-200 outline-none"
              />
              <input
                type="text"
                placeholder="Value (e.g. Novaspire)"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg p-2 text-xs text-slate-200 outline-none"
              />
              <button
                type="submit"
                disabled={isSavingMemory}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-xs transition-colors"
              >
                Save
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}