import React from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* Top navigation bar */}
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          <div className="logo" style={{ fontWeight: 700 }}>
            <span
              className="logo-symbol"
              aria-hidden="true"
              style={{
                color: 'var(--kavia-orange)',
                fontWeight: 700,
                fontSize: '2rem',
                marginRight: 4
              }}
            >
              ⏳
            </span>
            DeadlineDash
          </div>
        </div>
      </nav>

      {/* Main list view area */}
      <main
        style={{
          flex: 1,
          marginTop: 72, // Leaves space for fixed navbar
          padding: '0 0 64px 0',
          minHeight: '60vh',
          background: 'var(--kavia-dark)',
        }}
        aria-label="List of deadlines"
      >
        <div className="container">
          {/* Deadline list will eventually be rendered here.
              For now, show empty state. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 56,
              color: 'var(--text-secondary)',
              minHeight: 220,
            }}
          >
            <div style={{ fontSize: '1.16rem', marginBottom: 8 }}>
              <span role="img" aria-label="no deadlines">🎉</span> No deadlines yet
            </div>
            <div style={{ fontSize: '0.98rem' }}>
              Click the <span style={{ color: '#FFB300', fontWeight: 500 }}>+</span> button to add your first deadline.
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button
        className="fab"
        aria-label="Add deadline"
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          zIndex: 120,
          backgroundColor: '#FFB300',
          color: '#1A1A1A',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 4px 16px rgba(30,30,30,0.22)',
          fontSize: '2.1rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s, background 0.2s',
        }}
        tabIndex={0}
      >
        +
      </button>
    </div>
  );
}

export default App;