// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Mail, Save } from 'lucide-react';
import EmailTemplate from './pages/EmailTemplate/EmailTemplate';
import SavedTemplatesViewer from './components/SaveTemplates/SavedTemplatesViewer';
import './App.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">Email Template Builder</h1>
        <div className="nav-buttons">
          <Link to="/" className="button">
            <Mail />
            Editor
          </Link>
          <Link to="/saved" className="button">
            <Save />
            Saved Templates
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EmailTemplate />} />
            <Route path="/editor" element={<EmailTemplate />} />
            <Route path="/saved" element={<SavedTemplatesViewer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;