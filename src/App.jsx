// App.jsx
import React from 'react';
import './App.css';
import EmailTemplate from './pages/EmailTemplate/EmailTemplate';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="nav-container">
          <div className="nav-brand">Email Template Builder</div>
          <div className="nav-links">
            <button className="nav-link">Templates</button>
            <button className="nav-link active">Editor</button>
            <button className="nav-link">Settings</button>
          </div>
          <div className="nav-profile">
            <img 
              src="/api/placeholder/32/32" 
              alt="Profile" 
              className="profile-image"
            />
          </div>
        </nav>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Templates</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item">New Template</span>
          </div>
          
        <EmailTemplate />

        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2025 Email Template Builder. All rights reserved.</p>
          <div className="footer-links">
            <a href="#help" className="footer-link">Help</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#terms" className="footer-link">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;