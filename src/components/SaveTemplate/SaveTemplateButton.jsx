// SaveTemplateButton.jsx
import React, { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import './SaveTemplateButton.css';

const SaveTemplateButton = ({ sections, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!templateName.trim()) return;

    setIsSaving(true);
    try {
      const templateData = {
        name: templateName,
        description: description,
        sections: sections,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };

      await onSave(templateData);
      
      setIsOpen(false);
      setTemplateName('');
      setDescription('');
    } catch (error) {
      console.error('Error saving template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)} 
        variant="default" 
        className="save-template-btn"
      >
        <Icon name="save" />
        Save Template
      </Button>
    );
  }

  return (
    <div className="save-template-modal-overlay">
      <div className="save-template-modal">
        <div className="save-template-modal-header">
          <h2>Save Email Template</h2>
          <button 
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="x" />
          </button>
        </div>

        <div className="save-template-modal-content">
          <p className="modal-description">
            Give your template a name and description to save it for future use.
          </p>

          <div className="input-group">
            <label htmlFor="templateName">Template Name</label>
            <Input
              id="templateName"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description (Optional)</label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter template description"
            />
          </div>
        </div>

        <div className="save-template-modal-footer">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleSave} 
            disabled={!templateName.trim() || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveTemplateButton;