import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/Card/Card.jsx';
import Button from '../../components/Button/Button.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import '../TemplateLists/TemplateList.css';

const TemplatesList = ({ onLoadTemplate, onDeleteTemplate }) => {
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    setTemplates(savedTemplates);
  }, []);

  const handleDelete = (index) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
    setTemplates(updatedTemplates);
    if (onDeleteTemplate) onDeleteTemplate(index);
  };

  if (templates.length === 0) {
    return (
      <Card className="templates-list-empty">
        <CardContent>
          <p>No saved templates yet. Create and save a template to see it here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="templates-list">
      <CardHeader>
        <CardTitle>Saved Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="templates-grid">
          {templates.map((template, index) => (
            <div key={index} className="template-card">
              <div className="template-header">
                <h3>{template.name}</h3>
                <div className="template-actions">
                  <button
                    className="template-action-btn"
                    onClick={() => handleDelete(index)}
                    title="Delete template"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
              {template.description && (
                <p className="template-description">{template.description}</p>
              )}
              <div className="template-meta">
                <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
              </div>
              <Button
                variant="default"
                className="load-template-btn"
                onClick={() => onLoadTemplate(template)}
              >
                <Icon name="file-text" />
                Load Template
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatesList;