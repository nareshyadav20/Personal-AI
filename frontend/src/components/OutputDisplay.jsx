import React, { useState } from 'react';
import { Copy, Download, Check, Scissors, Briefcase, Smile, Code } from 'lucide-react';
import { refineContent } from '../services/api';

export default function OutputDisplay({ generation, onRefineComplete }) {
  const [copied, setCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  if (!generation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generation.generated_content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generation.generated_content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ghostwriter_${generation.platform}_v${generation.version}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRefine = async (action) => {
    setIsRefining(true);
    try {
      const res = await refineContent(generation.id, action);
      if (res.success) {
        onRefineComplete(res.data);
      }
    } catch (err) {
      console.error('Refinement failed:', err);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="output-section">
      <div className="output-card">
        {/* Output Header */}
        <div className="output-card-header">
          <div className="output-meta">
            <span className="output-tag">{generation.platform}</span>
            <span className="output-version">Version {generation.version}</span>
          </div>

          <div className="output-actions">
            <button onClick={handleCopy} className="btn-action">
              {copied ? <Check size={13} style={{ color: 'var(--success-color)' }} /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button onClick={handleDownloadTxt} className="btn-action">
              <Download size={13} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="output-body-wrapper">
          {isRefining && (
            <div className="refine-overlay">
              <span className="refine-spinner"></span>
              <span>Refining content...</span>
            </div>
          )}
          <div className="output-body">
            {generation.generated_content}
          </div>
        </div>

        {/* 1-Click Refinements */}
        <div className="refine-section">
          <div className="refine-title">⚡ One-Click Refinement Actions</div>
          <div className="refine-pill-grid">
            <button
              disabled={isRefining}
              onClick={() => handleRefine('make_shorter')}
              className="refine-pill"
            >
              <Scissors size={12} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>Make Shorter</span>
            </button>
            
            <button
              disabled={isRefining}
              onClick={() => handleRefine('make_professional')}
              className="refine-pill"
            >
              <Briefcase size={12} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>Make Professional</span>
            </button>

            <button
              disabled={isRefining}
              onClick={() => handleRefine('add_emojis')}
              className="refine-pill"
            >
              <Smile size={12} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>Add Emojis</span>
            </button>

            <button
              disabled={isRefining}
              onClick={() => handleRefine('make_technical')}
              className="refine-pill"
            >
              <Code size={12} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>Make Technical</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}