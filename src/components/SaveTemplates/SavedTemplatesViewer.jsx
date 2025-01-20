import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SavedTemplatesViewer.css'

const SavedTemplatesViewer = () => {
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewMode, setPreviewMode] = useState('grid'); // 'grid' or 'full'
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

  const generatePreviewHTML = (template) => {
    const sectionsHtml = template.sections.map(section => {
      switch (section.type) {
        case 'title':
          return `<h1 style="font-family: ${section.styles?.fontFamily || 'Arial'};
                            font-size: ${section.styles?.fontSize || '24px'};
                            color: ${section.styles?.color || '#000'};
                            text-align: ${section.styles?.textAlign || 'left'};
                            margin: 10px 0;">${section.content}</h1>`;
        case 'text':
          return `<p style="font-family: ${section.styles?.fontFamily || 'Arial'};
                          font-size: ${section.styles?.fontSize || '16px'};
                          color: ${section.styles?.color || '#333'};
                          line-height: 1.6;
                          margin: 10px 0;">${section.content}</p>`;
        case 'image':
          return `<img src="${section.imageUrl}" 
                      alt="Template content" 
                      style="max-width: 100%;
                             height: auto;
                             border-radius: ${section.styles?.borderRadius || '0'};
                             box-shadow: ${section.styles?.boxShadow || 'none'};
                             margin: 10px 0;" />`;
        case 'link':
          return `<div style="margin: 10px 0;">
                    <a href="${section.url}" 
                       style="display: inline-block;
                              padding: ${section.styles?.padding || '10px 20px'};
                              background-color: ${section.styles?.backgroundColor || '#007bff'};
                              color: ${section.styles?.color || '#fff'};
                              text-decoration: none;
                              border-radius: ${section.styles?.borderRadius || '4px'};
                              font-family: ${section.styles?.fontFamily || 'Arial'};">${section.content}</a>
                  </div>`;
        case 'divider':
          return `<hr style="border: none; 
                           border-top: ${section.styles?.borderTop || '1px solid #ccc'}; 
                           margin: ${section.styles?.margin || '20px 0'};" />`;
        case 'spacer':
          return `<div style="height: ${section.styles?.height || '20px'};"></div>`;
        default:
          return '';
      }
    }).join('');

    return `
      <div style="max-width: ${template.globalStyles?.maxWidth || '600px'};
                  margin: 0 auto;
                  background-color: ${template.globalStyles?.backgroundColor || '#ffffff'};
                  padding: ${template.globalStyles?.padding || '20px'};">
        ${sectionsHtml}
      </div>
    `;
  };

  const handleEditTemplate = (template) => {
    localStorage.setItem('editingTemplate', JSON.stringify(template));
    navigate('/');
  };

  const deleteTemplate = (index) => {
    const updatedTemplates = savedTemplates.filter((_, i) => i !== index);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    setSavedTemplates(updatedTemplates);
    setSelectedTemplate(null);
  };

  return (
    <div className="templates-viewer">

      <div className="viewer-header">
        <h1 className="viewer-title">Saved Templates</h1>
      </div>

      {savedTemplates.length === 0 ? (
        <div className="empty-state">
          No saved templates yet. Create your first template to get started!
        </div>
      ) : (
        <div className="templates-grid">
          {savedTemplates.map((template, index) => (
            <div key={index} className="template-card">
              <div className="template-header">
                <h3 className="template-title">Template {index + 1}</h3>
                <div className="template-actions">
                  <button
                    className="action-button"
                    onClick={() => setSelectedTemplate(template)}
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
              <div className="template-preview">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: generatePreviewHTML(template)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div className="full-preview-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="full-preview-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-preview"
              onClick={() => setSelectedTemplate(null)}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
            <div 
              dangerouslySetInnerHTML={{ 
                __html: generatePreviewHTML(selectedTemplate)
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedTemplatesViewer;