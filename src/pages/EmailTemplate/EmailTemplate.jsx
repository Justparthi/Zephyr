// components/EmailTemplate/EmailTemplate.js
import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import Label from '../../components/Label/Label.jsx';
import Textarea from '../../components/TextArea/TextArea.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './EmailTemplate.css';

// Mock template data
const mockTemplate = {
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>{title}</h1>
      <img src="{imageUrl}" alt="Email Image" style="max-width: 100%; height: auto;"/>
      <div>{content}</div>
    </div>
  `,
  defaultValues: {
    title: "Welcome to Our Newsletter",
    content: "This is the default content of our newsletter.",
    imageUrl: "/api/placeholder/600/300"
  }
};

const EmailTemplate = () => {
  const [template, setTemplate] = useState({
    title: "",
    content: "",
    imageUrl: "",
    html: ""
  });
  
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setTemplate({
      ...mockTemplate.defaultValues,
      html: mockTemplate.html
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTemplate(prev => ({
        ...prev,
        imageUrl
      }));
    }
  };

  const generatePreview = () => {
    let preview = template.html;
    preview = preview.replace("{title}", template.title);
    preview = preview.replace("{imageUrl}", template.imageUrl);
    preview = preview.replace("{content}", template.content);
    setPreviewHtml(preview);
    setShowPreview(true);
  };

  const handleSave = () => {
    console.log("Template Data:", template);
  };

  return (
    <div className="editor-container">
      <Card>
        <CardHeader>
          <CardTitle>Email Template Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="editor-content">
            <div className="form-group">
              <Label htmlFor="title">Email Title</Label>
              <Input
                id="title"
                value={template.title}
                onChange={(e) => setTemplate(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                placeholder="Enter email title"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="image">Email Image</Label>
              <div className="image-upload">
                {template.imageUrl && (
                  <img 
                    src={template.imageUrl} 
                    alt="Template Preview" 
                    className="preview-image"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="content">Email Content</Label>
              <Textarea
                id="content"
                value={template.content}
                onChange={(e) => setTemplate(prev => ({
                  ...prev,
                  content: e.target.value
                }))}
                placeholder="Enter email content"
                rows={6}
              />
            </div>

            <div className="button-group">
              <Button onClick={generatePreview}>
                <Icon name="eye" />
                Preview
              </Button>
              <Button onClick={handleSave} variant="default">
                <Icon name="save" />
                Save Template
              </Button>
            </div>

            {showPreview && (
              <div className="preview-section">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplate;