// components/EmailTemplate/EmailTemplate.js
import Card, { CardHeader, CardTitle, CardContent } from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import Label from '../../components/Label/Label.jsx';
import Textarea from '../../components/TextArea/TextArea.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import LinkButton from '../../components/LinkBtn/LinkButton.jsx';
import './EmailTemplate.css';
import SaveTemplateButton from '../../components/SaveTemplate/SaveTemplateButton.jsx';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SECTION_TYPES = {
  TITLE: 'title',
  IMAGE: 'image',
  TEXT: 'text',
  LINK: 'link',
  SOCIAL_LINKS: 'social_links'
};

const SOCIAL_ICONS = {
  facebook: 'facebook',
  x: 'x',
  instagram: 'instagram',
  linkedin: 'linkedin',
  youtube: 'youtube',
  github: 'github'
};

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

const EmailTemplate = () => {

  const [sections, setSections] = useState([
    {
      id: 1,
      type: SECTION_TYPES.TITLE,
      content: 'Welcome to Our Newsletter'
    },
    {
      id: 2,
      type: SECTION_TYPES.IMAGE,
      imageUrl: 'https://t4.ftcdn.net/jpg/02/59/98/87/360_F_259988723_FkzrqRyMP1kQk8WMkYnKT4o2Tw29d9Ki.jpg',
      content: ''
    },
    {
      id: 3,
      type: SECTION_TYPES.TEXT,
      content: `We're excited to share our latest updates with you! Our team has been working hard to bring you the best content and features.`
    },
    {
      id: 4,
      type: SECTION_TYPES.LINK,
      content: 'Read More',
      url: 'https://www.example.com'
    },
    {
      id: 5,
      type: SECTION_TYPES.SOCIAL_LINKS,
      content: [
        { icon: 'facebook', url: '', label: 'Facebook' },
        { icon: 'twitter', url: '', label: 'Twitter' }
      ]
    }
  ]);
    const [activeView, setActiveView] = useState('editor');
    // const [sections, setSections] = useState([]);
    const [previewHtml, setPreviewHtml] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [showHtmlPreview, setShowHtmlPreview] = useState(false);
    const [view, setView] = useState('editor');
     const navigate = useNavigate();
     const generateHTML = () => {
      const sectionsHtml = sections.map(section => {
        switch (section.type) {
          case SECTION_TYPES.TITLE:
            return `<h1 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 1rem;">${section.content}</h1>`;
          case SECTION_TYPES.IMAGE:
            return `<img src="${section.imageUrl}" alt="Email Image" style="max-width: 100%; height: auto; margin: 1rem 0;"/>`;
          case SECTION_TYPES.TEXT:
            return `<div style="font-family: Arial, sans-serif; color: #666; line-height: 1.6; margin-bottom: 1rem;">${section.content}</div>`;
          case SECTION_TYPES.LINK:
            return `<table cellpadding="0" cellspacing="0" style="margin: 1rem 0;">
              <tr>
                <td>
                  <a href="${formatURL(section.url)}" 
                     style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                     color: #ffffff; text-decoration: none; border-radius: 4px; 
                     font-family: Arial, sans-serif;"
                     target="_blank" rel="noopener noreferrer">
                    ${section.content}
                  </a>
                </td>
              </tr>
            </table>`;
          case SECTION_TYPES.SOCIAL_LINKS:
            return `
              <table cellpadding="0" cellspacing="0" style="margin: 1rem 0; width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    ${section.content.map(link => `
                      <a href="${formatURL(link.url)}" 
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
                    `).join('')}
                  </td>
                </tr>
              </table>`;
          default:
            return '';
        }
      }).join('\n');
    
      return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; padding: 20px;">
          <tr>
            <td>
              ${sectionsHtml}
            </td>
          </tr>
        </table>
      </body>
      </html>`;
    };

  const loadTemplate = (template) => {
    setSections(template.sections);
    setView('editor');
  };
  const addSocialLink = (sectionId) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId && section.type === SECTION_TYPES.SOCIAL_LINKS) {
        return {
          ...section,
          content: [
            ...section.content,
            {
              icon: Object.keys(SOCIAL_ICONS)[0], // Get first icon from SOCIAL_ICONS
              url: '',
              label: Object.keys(SOCIAL_ICONS)[0].charAt(0).toUpperCase() + 
                    Object.keys(SOCIAL_ICONS)[0].slice(1) // Capitalize first letter
            }
          ]
        };
      }
      return section;
    }));
  };
  
  const updateSocialLink = (sectionId, linkIndex, field, value) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId && section.type === SECTION_TYPES.SOCIAL_LINKS) {
        const newContent = [...section.content];
        newContent[linkIndex] = { ...newContent[linkIndex], [field]: value };
        return { ...section, content: newContent };
      }
      return section;
    }));
  };
  
  const removeSocialLink = (sectionId, linkIndex) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId && section.type === SECTION_TYPES.SOCIAL_LINKS) {
        const newContent = [...section.content];
        newContent.splice(linkIndex, 1);
        return { ...section, content: newContent };
      }
      return section;
    }));
  };

      const addSection = (type) => {
        setSections(prev => [...prev, {
          id: Date.now(),
          type,
          content: '',
          imageUrl: type === SECTION_TYPES.IMAGE ? '/api/placeholder/600/300' : '',
          url: type === SECTION_TYPES.LINK ? '' : undefined
        }]);
      };

  const removeSection = (id) => {
    setSections(prev => prev.filter(section => section.id !== id));
  };

  const moveSection = (id, direction) => {
    setSections(prev => {
      const index = prev.findIndex(section => section.id === id);
      if (
        (direction === 'up' && index === 0) || 
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newSections = [...prev];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newSections[index], newSections[swapIndex]] = 
      [newSections[swapIndex], newSections[index]];

      return newSections;
    });
  };

  const updateSectionContent = (id, value, field = 'content') => {
    if (field === 'url') {
      // Format URL if it doesn't start with a protocol
      value = formatURL(value);
    }
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const formatURL = (url) => {
    if (!url) return '';
    // Check if URL already has a protocol
    if (url.match(/^https?:\/\//i)) {
      return url;
    }
    // Check if URL starts with www.
    if (url.startsWith('www.')) {
      return `https://${url}`;
    }
    // Add both https:// and www. if neither is present
    return `https://www.${url}`;
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateSectionContent(id, imageUrl, 'imageUrl');
    }
  };

  useEffect(() => {
    // Check for a template to edit when component mounts
    const editingTemplate = localStorage.getItem('editingTemplate');
    if (editingTemplate) {
      const template = JSON.parse(editingTemplate);
      setSections(template.sections);
      // Clear the editing template from storage
      localStorage.removeItem('editingTemplate');
    }
  }, []);
  const generatePreview = () => {
    return sections.map(section => {
      switch (section.type) {
        case SECTION_TYPES.TITLE:
          return `<h1 style="font-family: Arial, sans-serif; color: #333;">${section.content}</h1>`;
        case SECTION_TYPES.IMAGE:
          return `<img src="${section.imageUrl}" alt="Email Image" style="max-width: 100%; height: auto; margin: 1rem 0;"/>`;
        case SECTION_TYPES.TEXT:
          return `<div style="font-family: Arial, sans-serif; color: #666; line-height: 1.6;">${section.content}</div>`;
        case SECTION_TYPES.LINK:
          return `<table cellpadding="0" cellspacing="0" style="margin: 1rem 0;">
            <tr>
              <td>
                <a href="${formatURL(section.url)}" 
                   style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                   color: #ffffff; text-decoration: none; border-radius: 4px; 
                   font-family: Arial, sans-serif;"
                   target="_blank" rel="noopener noreferrer">
                  ${section.content}
                </a>
              </td>
            </tr>
          </table>`;
          case SECTION_TYPES.SOCIAL_LINKS:
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
    
          default:
            return '';
        }
      }).join('\n');
  };
  const handleSaveTemplate = async (templateData) => {
    try {
      // Process template data to ensure proper social links structure
      const processedTemplateData = {
        ...templateData,
        sections: templateData.sections.map(section => {
          if (section.type === SECTION_TYPES.SOCIAL_LINKS) {
            // Ensure content is an array with proper structure
            return {
              ...section,
              content: Array.isArray(section.content) ? section.content : [
                // Default social links if content is not an array
                { icon: 'facebook', url: '', label: 'Facebook' },
                { icon: 'x', url: '', label: 'X' }
              ]
            };
          }
          return section;
        })
      };
  
      const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
  
      // Check if we're editing an existing template
      const editingTemplate = localStorage.getItem('editingTemplate');
      if (editingTemplate) {
        // Find and update the existing template
        const editTemplate = JSON.parse(editingTemplate);
        const templateIndex = savedTemplates.findIndex(
          template => JSON.stringify(template) === JSON.stringify(editTemplate)
        );
  
        if (templateIndex !== -1) {
          savedTemplates[templateIndex] = processedTemplateData;
        } else {
          savedTemplates.push(processedTemplateData);
        }
      } else {
        // Add new template
        savedTemplates.push(processedTemplateData);
      }
  
      localStorage.setItem('emailTemplates', JSON.stringify(savedTemplates));
      localStorage.removeItem('editingTemplate'); // Clean up after saving
      navigate('/saved');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    }

    useEffect(() => {
      // Load template with proper initialization of social links
      const editingTemplate = localStorage.getItem('editingTemplate');
      if (editingTemplate) {
        const template = JSON.parse(editingTemplate);
        const processedSections = template.sections.map(section => {
          if (section.type === SECTION_TYPES.SOCIAL_LINKS && !Array.isArray(section.content)) {
            return {
              ...section,
              content: [] // Initialize empty array if content is not an array
            };
          }
          return section;
        });
        setSections(processedSections);
        localStorage.removeItem('editingTemplate');
      }
    }, []);
  };
const renderSection = (section) => {
  switch (section.type) {
    case SECTION_TYPES.TITLE:
      return (
        <Input
          value={section.content}
          onChange={(e) => updateSectionContent(section.id, e.target.value)}
          placeholder="Enter title"
        />
      );

    case SECTION_TYPES.IMAGE:
      return (
        <div className="image-upload">
          {section.imageUrl && (
            <img 
              src={section.imageUrl} 
              alt="Template Preview" 
              className="preview-image"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(section.id, e)}
            className="file-input"
          />
        </div>
      );

    case SECTION_TYPES.TEXT:
      return (
        <Textarea
          value={section.content}
          onChange={(e) => updateSectionContent(section.id, e.target.value)}
          placeholder="Enter content"
          rows={4}
        />
      );

    case SECTION_TYPES.LINK:
      return (
        <div className="link-inputs">
          <Input
            value={section.content}
            onChange={(e) => updateSectionContent(section.id, e.target.value)}
            placeholder="Enter button text"
            className="mb-2"
          />
          <Input
            value={section.url || ''}
            onChange={(e) => updateSectionContent(section.id, e.target.value, 'url')}
            placeholder="Enter URL (e.g., example.com)"
          />
          {section.url && (
            <Button
              onClick={() => window.open(formatURL(section.url), '_blank', 'noopener,noreferrer')}
              variant="default"
              className="mt-2"
            >
              <Icon name="external-link" />
              Test Link
            </Button>
          )}
        </div>
      );

    case SECTION_TYPES.SOCIAL_LINKS:
      return (
        <div className="social-links-editor">
      {section.content.map((link, index) => (
        <div key={index} className="social-link-item">
          <div className="social-link-controls">
            <div className="flex items-center gap-2">
              {/* Platform Select */}
              <div className="w-1/4">
                <select
                  value={link.icon}
                  onChange={(e) => updateSocialLink(section.id, index, 'icon', e.target.value)}
                  className="w-full"
                >
                  {Object.entries(SOCIAL_ICONS).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Label Input */}
              <div className="w-1/4">
                <Input
                  value={link.label}
                  onChange={(e) => updateSocialLink(section.id, index, 'label', e.target.value)}
                  placeholder="Label"
                  className="w-full"
                />
              </div>
              
              {/* URL Input */}
              <div className="flex-1">
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(section.id, index, 'url', e.target.value)}
                  placeholder="URL (e.g., facebook.com/mypage)"
                  className="w-full"
                />
              </div>
              
              {/* Delete Button */}
              <div className="shrink-0">
                <Button
                  onClick={() => removeSocialLink(section.id, index)}
                  variant="destructive"
                  size="icon"
                >
                  <Icon name="trash" className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Test Link Button */}
            {link.url && (
              <Button
                onClick={() => window.open(formatURL(link.url), '_blank', 'noopener,noreferrer')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Icon name="external-link" className="mr-2 h-4 w-4" />
                Test Link
              </Button>
            )}
          </div>
        </div>
      ))}
      
      {/* Add New Social Link Button */}
      <Button
        onClick={() => addSocialLink(section.id)}
        variant="outline"
        className="w-full"
      >
        <Icon name="plus" className="mr-2 h-4 w-4" />
        Add Social Link
      </Button>
    </div>
      );

    default:
      return null;
  
  }
};

  const HTMLView = () => (
    <div className="html-view">
      <Card>
        <CardHeader>
          <CardTitle>Email HTML</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="html-controls">
            <Button 
              onClick={() => {
                navigator.clipboard.writeText(generateHTML());
                // You might want to add a toast notification here
              }}
              variant="default"
            >
              <Icon name="copy" />
              Copy HTML
            </Button>
          </div>
          <pre className="html-content">
            <code>{generateHTML()}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );

  const toggleHtmlPreview = () => {
    setShowHtmlPreview(!showHtmlPreview);
    if (!showHtmlPreview) {
      setShowPreview(false); // Close regular preview when showing HTML preview
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    if (!showPreview) {
      setShowHtmlPreview(false); // Close HTML preview when showing regular preview
      generatePreview();
    }
  };

  return (
    <div className="email-editor-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <Card className="sidebar-card">
          <CardHeader>
            <CardTitle>Add Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="sidebar-buttons">
              <Button onClick={() => addSection(SECTION_TYPES.TITLE)} variant="default" className="sidebar-button">
                <Icon name="plus" />
                Add Title
              </Button>
              <Button onClick={() => addSection(SECTION_TYPES.IMAGE)} variant="default" className="sidebar-button">
                <Icon name="image" />
                Add Image
              </Button>
              <Button onClick={() => addSection(SECTION_TYPES.TEXT)} variant="default" className="sidebar-button">
                <Icon name="type" />
                Add Text
              </Button>
              <Button onClick={() => addSection(SECTION_TYPES.LINK)} variant="default" className="sidebar-button">
                <Icon name="link" />
                Add Link Button
              </Button>
              
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor Section */}
      <div className="editor-section">
        <Card className="content-card">
          <CardHeader>
            <CardTitle>Email Editor</CardTitle>
            <div className="preview-controls">
              <SaveTemplateButton 
                sections={sections}
                onSave={handleSaveTemplate}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="sections-list">
              {sections.map((section, index) => (
                <div key={section.id} className="section-item">
                  <div className="section-header">
                    <span className="section-type">
                      {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                    </span>
                    <div className="section-controls">
                      <button 
                        className="control-button"
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                      >
                        <Icon name="arrow-up" />
                      </button>
                      <button 
                        className="control-button"
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                      >
                        <Icon name="arrow-down" />
                      </button>
                      <button 
                        className="control-button delete"
                        onClick={() => removeSection(section.id)}
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </div>
                  <div className="section-content">
                    {renderSection(section)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="preview-section">
        {/* Visual Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              dangerouslySetInnerHTML={{ __html: generatePreview() }}
              className="preview-content"
            />
          </CardContent>
        </Card>

        {/* HTML Preview */}
        <Card>
          <CardHeader>
            <CardTitle>HTML Preview</CardTitle>
            <Button 
              onClick={() => navigator.clipboard.writeText(generateHTML())}
              variant="default"
              className="copy-button"
            >
              <Icon name="copy" />
              Copy HTML
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="html-preview">
              <code>{generateHTML()}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default EmailTemplate;
