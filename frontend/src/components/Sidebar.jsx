import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Clock, Sparkles, Settings, Plus, X, Star, Trash2, LogOut } from 'lucide-react';
import { fetchHistory, fetchTemplates, toggleFavorite, deleteHistoryItem } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ onSelectHistoryItem, onSelectTemplate, onNewWorkspace, currentGenId }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    loadSidebarData();
  }, [currentGenId]);

  const loadSidebarData = async () => {
    try {
      const histData = await fetchHistory();
      if (histData.success) setHistory(histData.data);

      const templData = await fetchTemplates();
      if (templData.success) setTemplates(templData.data);
    } catch (err) {
      console.error('Failed to load sidebar data:', err);
    }
  };

  const handleToggleFav = async (e, id) => {
    e.stopPropagation();
    try {
      await toggleFavorite(id);
      loadSidebarData();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteHistoryItem(id);
      loadSidebarData();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleNavClick = (path) => {
    setIsHistoryOpen(false);
    setIsTemplatesOpen(false);
    navigate(path);
  };

  return (
    <>
      <aside className="sidebar">
        {/* Header Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="currentColor"/>
            </svg>
            <span>Personal AI</span>
          </div>
        </div>

        {/* New Session Button */}
        <div className="new-button-container">
          <button onClick={onNewWorkspace} className="btn-new">
            <span>New Space</span>
            <span className="new-shortcut">
              <Plus size={14} />
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div
            onClick={() => handleNavClick('/')}
            className={`nav-item ${location.pathname === '/' && !isHistoryOpen && !isTemplatesOpen ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </div>

          <div
            onClick={() => {
              setIsHistoryOpen(true);
              setIsTemplatesOpen(false);
            }}
            className={`nav-item ${isHistoryOpen ? 'active' : ''}`}
          >
            <Clock size={18} />
            <span>History</span>
          </div>

          <div
            onClick={() => {
              setIsTemplatesOpen(true);
              setIsHistoryOpen(false);
            }}
            className={`nav-item ${isTemplatesOpen ? 'active' : ''}`}
          >
            <Sparkles size={18} />
            <span>Templates</span>
          </div>

          <div
            onClick={() => handleNavClick('/settings')}
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Customise</span>
          </div>
        </nav>

        {/* Footer profile status */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{user ? user.name.charAt(0).toUpperCase() : 'U'}</div>
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'User'}</span>
              <span className="user-status">
                <span className="status-dot"></span>
                <span>Active</span>
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="theme-toggle-track">
                <span className="theme-toggle-icon sun">☀️</span>
                <span className="theme-toggle-icon moon">🌙</span>
              </div>
              <div className="theme-toggle-thumb" />
            </button>
            <button
              id="sidebar-logout"
              className="sidebar-logout-btn"
              onClick={logout}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* History Slide-out Drawer */}
      {isHistoryOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsHistoryOpen(false)} />
          <div className="history-drawer">
            <div className="drawer-header">
              <div className="drawer-title">
                <Clock size={16} />
                <span>Chat History</span>
              </div>
              <button className="btn-close-drawer" onClick={() => setIsHistoryOpen(false)}>
                <X size={16} />
              </button>
            </div>
            
            <div className="drawer-list custom-scrollbar">
              {history.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '20px' }}>
                  No history found.
                </p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      setIsHistoryOpen(false);
                    }}
                    className={`history-card-item ${currentGenId === item.id ? 'active' : ''}`}
                  >
                    <div className="history-card-header-row">
                      <span>{item.platform} • {item.content_type}</span>
                      <div className="history-card-actions">
                        <button
                          onClick={(e) => handleToggleFav(e, item.id)}
                          className="history-card-action-btn"
                          title="Favorite"
                        >
                          <Star size={11} fill={item.is_favorite ? 'var(--accent-color)' : 'none'} color={item.is_favorite ? 'var(--accent-color)' : 'currentColor'} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="history-card-action-btn"
                          title="Delete"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                    <p className="history-card-txt">{item.generated_content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Templates Slide-out Drawer */}
      {isTemplatesOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsTemplatesOpen(false)} />
          <div className="history-drawer">
            <div className="drawer-header">
              <div className="drawer-title">
                <Sparkles size={16} />
                <span>Quick Templates</span>
              </div>
              <button className="btn-close-drawer" onClick={() => setIsTemplatesOpen(false)}>
                <X size={16} />
              </button>
            </div>
            
            <div className="drawer-list custom-scrollbar">
              {templates.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '20px' }}>
                  No templates available.
                </p>
              ) : (
                templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      onSelectTemplate(tpl);
                      setIsTemplatesOpen(false);
                    }}
                    className="history-card-item"
                  >
                    <div className="history-card-header-row" style={{ color: 'var(--text-primary)' }}>
                      <span>{tpl.title}</span>
                    </div>
                    <p className="history-card-txt" style={{ marginBottom: '8px' }}>{tpl.prompt_template}</p>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span className="template-tag">{tpl.platform}</span>
                      <span className="template-tag">{tpl.tone}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}