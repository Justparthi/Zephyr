import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SavedTemplatesViewer.css'

const SOCIAL_ICONS_SVG = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" stroke="#1877F2" stroke-width="0.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/>
  </svg>`,
  
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
    <path d="M17.1538 4H19.539L13.8244 10.3725L20.5 20H15.2497L11.0353 14.1819L6.21434 20H3.82818L9.91014 13.1975L3.5 4H8.87366L12.7197 9.32563L17.1538 4ZM15.8579 18.3663H17.1915L8.19015 5.56813H6.75806L15.8579 18.3663Z"/>
  </svg>`,
  
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#E4405F" stroke="#E4405F" stroke-width="0.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
  </svg>`,
  
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2" stroke="#0A66C2" stroke-width="0.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>`,
  
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000" stroke="#FF0000" stroke-width="0.5">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
  </svg>`,
  
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#181717" stroke="#181717" stroke-width="0.5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>`
};

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

  const formatURL = (url) => {
    if (!url) return '';
    if (url.match(/^https?:\/\//i)) return url;
    if (url.startsWith('www.')) return `https://${url}`;
    return `https://www.${url}`;
  };

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

                  case 'social_links':
                    if (!Array.isArray(section.content)) return '';
                    return `
                      <table cellpadding="0" cellspacing="0" style="margin: 1rem 0; width: 100%;">
                        <tr>
                          <td style="text-align: center;">
                            ${section.content.map(link => {
                              const formattedUrl = formatURL(link.url);
                              return formattedUrl ? `
                                <a href="${formattedUrl}" 
                                   style="display: inline-block; margin: 0 10px; text-decoration: none; color: #333;"
                                   target="_blank" rel="noopener noreferrer">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="text-align: center;">
                                        <div style="width: 24px; height: 24px;">
                                          ${SOCIAL_ICONS_SVG[link.icon] || ''}
                                        </div>
                                        <div style="font-size: 12px; margin-top: 4px; font-family: Arial, sans-serif;">
                                          ${link.label}
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </a>
                              ` : '';
                            }).join('')}
                          </td>
                        </tr>
                      </table>`;
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