import React, { useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function GeneratorPanel({ onGenerate, isLoading, formData, setFormData }) {
  const textareaRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = Boolean(formData.custom_prompt?.trim()) && !isLoading;

  const submitPrompt = () => {
    if (!canSubmit) return;
    onGenerate(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPrompt();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box-container">
      {/* Search Input Area */}
      <div className="search-input-area">
        <textarea
          ref={textareaRef}
          value={formData.custom_prompt || ''}
          onChange={(e) => handleChange('custom_prompt', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to create? Add topics, background context, or specific instructions..."
          className="search-textarea custom-scrollbar"
          rows={3}
        />
      </div>

      {/* Actions and Pills Row */}
      <div className="search-actions-bar">
        {/* Dropdown Matrix of Selector Pills */}
        <div className="pill-matrix">
          {/* Platform */}
          <div className="pill-dropdown-wrapper" title="Platform">
            <select
              value={formData.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
              className="pill-dropdown"
            >
              <option value="linkedin">Platform: LinkedIn</option>
              <option value="x">Platform: X (Twitter)</option>
              <option value="email">Platform: Email</option>
              <option value="blog">Platform: Blog</option>
              <option value="caption">Platform: Caption</option>
            </select>
          </div>

          {/* Content Type */}
          <div className="pill-dropdown-wrapper" title="Content Type">
            <select
              value={formData.content_type}
              onChange={(e) => handleChange('content_type', e.target.value)}
              className="pill-dropdown"
            >
              <option value="post">Type: Post</option>
              <option value="comment">Type: Comment</option>
              <option value="cover_letter">Type: Cover Letter</option>
              <option value="cold_outreach">Type: Cold Outreach</option>
              <option value="reply">Type: Reply</option>
            </select>
          </div>

          {/* Tone */}
          <div className="pill-dropdown-wrapper" title="Tone">
            <select
              value={formData.tone}
              onChange={(e) => handleChange('tone', e.target.value)}
              className="pill-dropdown"
            >
              <option value="professional">Tone: Professional</option>
              <option value="confident">Tone: Confident</option>
              <option value="casual">Tone: Casual</option>
              <option value="motivational">Tone: Motivational</option>
              <option value="funny">Tone: Funny</option>
              <option value="technical">Tone: Technical</option>
            </select>
          </div>

          {/* Audience */}
          <div className="pill-dropdown-wrapper" title="Audience">
            <select
              value={formData.audience}
              onChange={(e) => handleChange('audience', e.target.value)}
              className="pill-dropdown"
            >
              <option value="general">Audience: General</option>
              <option value="recruiters">Audience: Recruiters</option>
              <option value="developers">Audience: Developers</option>
              <option value="customers">Audience: Customers</option>
              <option value="students">Audience: Students</option>
            </select>
          </div>

          {/* Length */}
          <div className="pill-dropdown-wrapper" title="Length">
            <select
              value={formData.length}
              onChange={(e) => handleChange('length', e.target.value)}
              className="pill-dropdown"
            >
              <option value="short">Length: Short</option>
              <option value="medium">Length: Medium</option>
              <option value="long">Length: Long</option>
            </select>
          </div>
        </div>

        {/* Submit Action Button on right */}
        <div className="submit-btn-wrapper">
          <span className="zero-prompt-tag hidden sm:inline">Zero Prompt Eng.</span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-submit"
            title="Generate Content"
          >
            {isLoading ? (
              <Loader2 size={16} className="refine-spinner" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}