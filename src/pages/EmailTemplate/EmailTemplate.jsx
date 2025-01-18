// components/EmailTemplate/EmailTemplate.js
import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import Label from '../../components/Label/Label.jsx';
import Textarea from '../../components/TextArea/TextArea.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './EmailTemplate.css';

const SECTION_TYPES = {
  TITLE: 'title',
  IMAGE: 'image',
  TEXT: 'text'
};

const EmailTemplate = () => {
    const [activeView, setActiveView] = useState('editor');
    const [sections, setSections] = useState([]);
    const [previewHtml, setPreviewHtml] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [showHtmlPreview, setShowHtmlPreview] = useState(false);

    const generateHTML = () => {
        const sectionsHtml = sections.map(section => {
          switch (section.type) {
            case SECTION_TYPES.TITLE:
              return `<h1 style="font-family: Arial, sans-serif; color: #333; margin-bottom: 1rem;">${section.content}</h1>`;
            case SECTION_TYPES.IMAGE:
              return `<img src="${section.imageUrl}" alt="Email Image" style="max-width: 100%; height: auto; margin: 1rem 0;"/>`;
            case SECTION_TYPES.TEXT:
              return `<div style="font-family: Arial, sans-serif; color: #666; line-height: 1.6; margin-bottom: 1rem;">${section.content}</div>`;
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

      
  const addSection = (type) => {
    setSections(prev => [...prev, {
      id: Date.now(),
      type,
      content: '',
      imageUrl: type === SECTION_TYPES.IMAGE ? '/api/placeholder/600/300' : ''
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
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateSectionContent(id, imageUrl, 'imageUrl');
    }
  };

  const generatePreview = () => {
    const html = sections.map(section => {
      switch (section.type) {
        case SECTION_TYPES.TITLE:
          return `<h1 style="font-family: Arial, sans-serif; color: #333;">${section.content}</h1>`;
        case SECTION_TYPES.IMAGE:
          return `<img src="${section.imageUrl}" alt="Email Image" style="max-width: 100%; height: auto; margin: 1rem 0;"/>`;
        case SECTION_TYPES.TEXT:
          return `<div style="font-family: Arial, sans-serif; color: #666; line-height: 1.6;">${section.content}</div>`;
        default:
          return '';
      }
    }).join('\n');

    setPreviewHtml(`
      <div style="max-width: 600px; margin: 0 auto; padding: 1rem;">
        ${html}
      </div>
    `);
    setShowPreview(true);
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
    <div className="editor-container">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Email Template Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="editor-content">
            <div className="add-section-buttons">
              <Button onClick={() => addSection(SECTION_TYPES.TITLE)} variant="default">
                <Icon name="plus" />
                Add Title
              </Button>
              <Button onClick={() => addSection(SECTION_TYPES.IMAGE)} variant="default">
                <Icon name="image" />
                Add Image
              </Button>
              <Button onClick={() => addSection(SECTION_TYPES.TEXT)} variant="default">
                <Icon name="type" />
                Add Text
              </Button>
            </div>

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
            {sections.length > 0 && (
              <div className="button-group">
                <Button onClick={togglePreview} variant={showPreview ? "secondary" : "default"}>
                  <Icon name="eye" />
                  Visual Preview
                </Button>
                <Button onClick={toggleHtmlPreview} variant={showHtmlPreview ? "secondary" : "default"}>
                  <Icon name="code" />
                  HTML Preview
                </Button>
              </div>
            )}

            {showPreview && (
              <div className="preview-section">
                <Card>
                  <CardHeader>
                    <CardTitle>Visual Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      dangerouslySetInnerHTML={{ __html: previewHtml }}
                      className="preview-content"
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {showHtmlPreview && (
              <div className="preview-section">
                <Card>
                  <CardHeader>
                    <CardTitle>HTML Preview</CardTitle>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(generateHTML());
                      }}
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
            )}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .html-preview {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          white-space: pre-wrap;
          font-family: monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .copy-button {
          margin-left: auto;
        }

        .preview-section {
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};
export default EmailTemplate;



