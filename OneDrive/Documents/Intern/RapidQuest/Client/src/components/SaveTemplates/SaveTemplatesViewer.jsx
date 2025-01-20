// SavedTemplatesViewer.js
import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SavedTemplatesViewer.css';

const SavedTemplatesViewer = () => {
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTemplates = () => {
      const templates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      setSavedTemplates(templates);
    };

    loadTemplates();
    window.addEventListener('storage', loadTemplates);
    
    return () => {
      window.removeEventListener('storage', loadTemplates);
    };
  }, []);

  const handleEditTemplate = (template) => {
    // Save the template to edit in localStorage
    localStorage.setItem('editingTemplate', JSON.stringify(template));
    // Navigate to editor
    navigate('/');
  };

  const deleteTemplate = (index) => {
    const updatedTemplates = savedTemplates.filter((_, i) => i !== index);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    setSavedTemplates(updatedTemplates);
    setSelectedTemplate(null);
  };

  const handlePreviewClick = (template) => {
    setSelectedTemplate(template === selectedTemplate ? null : template);
  };

  return (
    <div className="templates-container">
      <div className="templates-card">
        <div className="card-header">
          <h2 className="card-title">Saved Templates</h2>
        </div>
        <div className="card-content">
          {savedTemplates.length === 0 ? (
            <div className="empty-state">
              No saved templates yet
            </div>
          ) : (
            <div className="templates-list">
              {savedTemplates.map((template, index) => (
                <div key={index} className="template-item">
                  <div className="template-header">
                    <h3 className="template-title">Template {index + 1}</h3>
                    <div className="template-actions">
                      <button
                        className="action-button"
                        onClick={() => handlePreviewClick(template)}
                        aria-label="Preview template"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-button"
                        onClick={() => handleEditTemplate(template)}
                        aria-label="Edit template"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => deleteTemplate(index)}
                        aria-label="Delete template"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedTemplate === template && (
                    <div className="template-preview">
                      <div 
                        className="preview-content"
                        dangerouslySetInnerHTML={{ 
                          __html: template.sections.map(section => {
                            switch (section.type) {
                              case 'title':
                                return `<h3>${section.content}</h3>`;
                              case 'text':
                                return `<p>${section.content}</p>`;
                              case 'image':
                                return `<img src="${section.imageUrl}" alt="Template content" />`;
                              case 'link':
                                return `<div><a href="${section.url}">${section.content}</a></div>`;
                              default:
                                return '';
                            }
                          }).join('')
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedTemplatesViewer;