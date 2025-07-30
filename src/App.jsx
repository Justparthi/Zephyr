// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Mail, Save } from 'lucide-react';
import EmailTemplate from './pages/EmailTemplate/EmailTemplate';
import SavedTemplatesViewer from './components/SaveTemplates/SavedTemplatesViewer';
import './App.css';
import frontpage from './pages/frontpage/Frontpage';
import Hero from './pages/Landing page/hero/Hero';
import Frontpage from './pages/frontpage/Frontpage';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">Emplate</h1>
        <div className="nav-buttons">
          <Link to="/editor" className="nav-button">
            <Mail className="nav-icon" />
            <span>Editor</span>
          </Link>
          <Link to="/saved" className="nav-button">
            <Save className="nav-icon" />
            <span>Saved Templates</span>
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
            <Route path="/" element={ <Frontpage /> } />
            <Route path="/editor" element={<EmailTemplate />} />
            <Route path="/saved" element={<SavedTemplatesViewer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
