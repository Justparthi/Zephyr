import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Eye, X, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SavedTemplatesViewer.css'


const DEFAULT_TEMPLATES = [
  {
    globalStyles: {
      maxWidth: '800px',
      backgroundColor: '#f8fafc',
      padding: '40px'
    },
    sections: [
      {
        type: 'title',
        content: 'Annual Impact Report 2025',
        styles: {
          fontFamily: 'Arial',
          fontSize: '36px',
          color: '#1e3a8a',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        content: 'Transforming Lives Through Innovation and Compassion',
        styles: {
          fontFamily: 'Arial',
          fontSize: '24px',
          color: '#2563eb',
          textAlign: 'center',
          fontStyle: 'italic'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://imgs.search.brave.com/khfCkdaUYeJhXLS2Po9jQh4UgQzba-fyv7u96lOEiCo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9naG9z/dC1pbWFnZXMuY2hh/bWFpbGVvbi5pby8y/MDI0LzA3L0Vzc2Vu/dGlhbC1UaXBzLWZv/ci1NYW5hZ2luZy1Z/b3VyLUVtYWlsLUNy/ZWF0aW9uLVdvcmtm/bG93LnBuZw',
        styles: {
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '100%',
          marginBottom: '30px'
        }
      },
      {
        type: 'text',
        content: 'Dear Stakeholders,\n\nWe are proud to present our 2025 Annual Impact Report, showcasing a year of remarkable achievements and meaningful progress in our mission to create positive change in communities worldwide. This report reflects our dedication to transparency, innovation, and sustainable impact.',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#334155',
          lineHeight: '1.8',
          marginBottom: '30px'
        }
      },
      {
        type: 'title',
        content: 'Key Impact Metrics',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#1e3a8a',
          marginBottom: '20px'
        }
      },
      {
        type: 'text',
        content: 'Community Development:\n• 50,000+ individuals served through educational programs\n• 120 community centers established worldwide\n• $25M invested in local infrastructure\n• 85% program completion rate\n\nHealthcare Initiatives:\n• 200,000+ medical consultations provided\n• 15 mobile health clinics launched\n• 95% vaccination program success rate\n• 30 new healthcare facilities built',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#334155',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'divider',
        styles: {
          borderTop: '2px solid #e2e8f0',
          margin: '30px 0'
        }
      },
      {
        type: 'title',
        content: 'Financial Overview',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#1e3a8a'
        }
      },
      {
        type: 'text',
        content: 'Resource Allocation:\n• Program Services: 75%\n• Administrative: 15%\n• Fundraising: 10%\n\nFunding Sources:\n• Government Grants: $45M\n• Private Donations: $30M\n• Corporate Partnerships: $25M\n• Investment Income: $10M',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#334155',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'divider',
        styles: {
          borderTop: '2px solid #e2e8f0',
          margin: '30px 0'
        }
      },
      {
        type: 'title',
        content: 'Looking Ahead: 2026 Strategic Initiatives',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#1e3a8a'
        }
      },
      {
        type: 'text',
        content: '1. Global Expansion\n• Launch operations in 10 new countries\n• Establish 50 additional community centers\n• Develop cross-border partnership networks\n\n2. Technology Integration\n• Implement AI-driven program assessment\n• Launch mobile health monitoring platforms\n• Develop virtual learning environments\n\n3. Sustainability Focus\n• Achieve carbon neutrality in all operations\n• Implement renewable energy in 100% of facilities\n• Launch environmental education programs',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#334155',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'link',
        content: 'Download Complete Report',
        url: '#',
        styles: {
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          padding: '15px 30px',
          borderRadius: '6px',
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '30px auto',
          maxWidth: '250px'
        }
      },
      {
        type: 'text',
        content: 'With gratitude,\n\nDr. Sarah Mitchell\nChief Executive Officer\nGlobal Impact Initiative',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#334155',
          whiteSpace: 'pre-line',
          textAlign: 'left',
          marginTop: '30px'
        }
      },
      {
        type: 'social_links',
        content: [
          { icon: 'linkedin', url: 'linkedin.com', label: 'LinkedIn' },
          { icon: 'x', url: 'twitter.com', label: 'Twitter' },
          { icon: 'facebook', url: 'facebook.com', label: 'Facebook' },
          { icon: 'youtube', url: 'youtube.com', label: 'YouTube' }
        ]
      }
    ]
  },
  {
    globalStyles: {
      maxWidth: '800px',
      backgroundColor: '#fffbeb',
      padding: '40px'
    },
    sections: [
      {
        type: 'title',
        content: 'Culinary Master Class Series',
        styles: {
          fontFamily: 'Arial',
          fontSize: '36px',
          color: '#92400e',
          textAlign: 'center'
        }
      },
      {
        type: 'text',
        content: 'A Journey Through Global Cuisines with Chef Maria Rodriguez',
        styles: {
          fontFamily: 'Arial',
          fontSize: '24px',
          color: '#b45309',
          textAlign: 'center',
          fontStyle: 'italic'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://imgs.search.brave.com/vrGahSkjmswhaaR2vFNTuhb9_B3T00RXk4kEZ5BCvVA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzExMjQ5MC9waG90/by9lbWFpbC1tYXJr/ZXRpbmctYW5kLW5l/d3NsZXR0ZXItY29u/Y2VwdC1kaXJlY3Qt/ZW1haWwtc2VuZGlu/Zy1mb3ItY29tcGFu/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9OC0yTjg5dFNP/eVVVcFJtcE9Ld0I3/M1RHQng4NkEzX2VV/UkN4RmJoT0NLcz0',
        styles: {
          borderRadius: '15px',
          boxShadow: '0 6px 12px rgba(146,64,14,0.1)',
          width: '100%',
          marginBottom: '30px'
        }
      },
      {
        type: 'text',
        content: 'Embark on an extraordinary culinary adventure with our comprehensive master class series. Join celebrated Chef Maria Rodriguez as she unveils the secrets of global cuisines, advanced cooking techniques, and the art of flavor composition.',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#78350f',
          lineHeight: '1.8',
          marginBottom: '30px'
        }
      },
      {
        type: 'title',
        content: 'Course Curriculum',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#92400e'
        }
      },
      {
        type: 'text',
        content: 'Module 1: Foundations of Global Cuisine\n• Classical French Techniques\n• Italian Pasta Mastery\n• Asian Flavor Profiles\n• Mediterranean Essentials\n\nModule 2: Advanced Cooking Methods\n• Sous Vide Perfection\n• Smoking and Curing\n• Fermentation Techniques\n• Modern Plating Design',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#78350f',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'divider',
        styles: {
          borderTop: '2px solid #92400e',
          margin: '30px 0'
        }
      },
      {
        type: 'title',
        content: 'What You\'ll Learn',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#92400e'
        }
      },
      {
        type: 'text',
        content: 'Professional Skills:\n• Knife techniques and kitchen efficiency\n• Menu development and food costing\n• Wine pairing fundamentals\n• Kitchen management essentials\n\nCulinary Innovation:\n• Modern gastronomy techniques\n• Plant-based cuisine development\n• Sustainable cooking practices\n• Artisanal bread making',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#78350f',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'divider',
        styles: {
          borderTop: '2px solid #92400e',
          margin: '30px 0'
        }
      },
      {
        type: 'title',
        content: 'Course Details',
        styles: {
          fontFamily: 'Arial',
          fontSize: '28px',
          color: '#92400e'
        }
      },
      {
        type: 'text',
        content: 'Program Structure:\n• 12 weeks of intensive training\n• 24 hands-on cooking sessions\n• 6 live Q&A sessions with Chef Maria\n• Access to exclusive recipe collection\n\nBonuses Include:\n• Digital recipe handbook\n• Kitchen equipment guide\n• Lifetime access to course updates\n• Private community membership',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#78350f',
          whiteSpace: 'pre-line',
          lineHeight: '1.8'
        }
      },
      {
        type: 'link',
        content: 'Enroll Now - Limited Spots Available',
        url: '#',
        styles: {
          backgroundColor: '#92400e',
          color: '#ffffff',
          padding: '15px 30px',
          borderRadius: '6px',
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '30px auto',
          maxWidth: '300px'
        }
      },
      {
        type: 'text',
        content: 'For inquiries:\nEmail: masterclass@culinary.com\nPhone: (555) 123-4567',
        styles: {
          fontFamily: 'Arial',
          fontSize: '16px',
          color: '#78350f',
          whiteSpace: 'pre-line',
          textAlign: 'center',
          marginTop: '30px'
        }
      },
      {
        type: 'social_links',
        content: [
          { icon: 'instagram', url: 'instagram.com', label: 'Instagram' },
          { icon: 'facebook', url: 'facebook.com', label: 'Facebook' },
          { icon: 'youtube', url: 'youtube.com', label: 'YouTube' }
        ]
      }
    ]
  }
];

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
  const [previewMode, setPreviewMode] = useState('grid');
  const navigate = useNavigate();
  useEffect(() => {
    const loadTemplates = () => {
      let templates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      
      // If no templates exist, initialize with default templates
      if (templates.length === 0) {
        templates = DEFAULT_TEMPLATES;
        localStorage.setItem('emailTemplates', JSON.stringify(templates));
      }
      
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

  const generateFullHTML = (template) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    ${generatePreviewHTML(template)}
</body>
</html>`;
  };

  const downloadTemplate = (template, index) => {
    const htmlContent = generateFullHTML(template);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${index + 1}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
                    className="action-button"
                    onClick={() => downloadTemplate(template, index)}
                    aria-label="Download template"
                  >
                    <Download size={16} />
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
