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
  LINK: 'link'
};

const EmailTemplate = () => {
    const [activeView, setActiveView] = useState('editor');
    const [sections, setSections] = useState([]);
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
        default:
          return '';
      }
    }).join('\n');
  };
const handleSaveTemplate = async (templateData) => {
  try {
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
        savedTemplates[templateIndex] = templateData;
      } else {
        savedTemplates.push(templateData);
      }
    } else {
      // Add new template
      savedTemplates.push(templateData);
    }

    localStorage.setItem('emailTemplates', JSON.stringify(savedTemplates));
    navigate('/saved');
  } catch (error) {
    console.error('Error saving template:', error);
    alert('Error saving template');
  }
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
