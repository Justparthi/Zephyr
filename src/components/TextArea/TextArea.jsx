import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List } from 'lucide-react';
import '../TextArea/TextArea.css';

const Textarea = ({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  disabled = false,
  required = false
}) => {
  const textareaRef = useRef(null);
  
  const applyFormatting = (command) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText = value;
    let newStart = start;
    let newEnd = end;
    
    switch (command) {
      case 'bold':
        newText = value.substring(0, start) + `<strong>${selectedText}</strong>` + value.substring(end);
        newEnd = end + 17; // Length of <strong></strong> tags
        break;
      case 'italic':
        newText = value.substring(0, start) + `<em>${selectedText}</em>` + value.substring(end);
        newEnd = end + 9; // Length of <em></em> tags
        break;
      case 'underline':
        newText = value.substring(0, start) + `<u>${selectedText}</u>` + value.substring(end);
        newEnd = end + 7; // Length of <u></u> tags
        break;
      case 'alignLeft':
        newText = value.substring(0, start) + `<div style="text-align: left">${selectedText}</div>` + value.substring(end);
        newEnd = end + 35; // Length of alignment tags
        break;
      case 'alignCenter':
        newText = value.substring(0, start) + `<div style="text-align: center">${selectedText}</div>` + value.substring(end);
        newEnd = end + 37; // Length of alignment tags
        break;
      case 'alignRight':
        newText = value.substring(0, start) + `<div style="text-align: right">${selectedText}</div>` + value.substring(end);
        newEnd = end + 36; // Length of alignment tags
        break;
      case 'list':
        const lines = selectedText.split('\n');
        const listItems = lines.map(line => `<li>${line}</li>`).join('\n');
        newText = value.substring(0, start) + `<ul>\n${listItems}\n</ul>` + value.substring(end);
        newEnd = end + listItems.length + 10; // Length of <ul></ul> tags plus added li tags
        break;
      default:
        return;
    }
    
    onChange({ target: { value: newText } });
    
    // Restore cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  return (
    <div className="rich-textarea-container">
      <div className="formatting-toolbar">
        <button
          type="button"
          onClick={() => applyFormatting('bold')}
          className="format-button"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('italic')}
          className="format-button"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('underline')}
          className="format-button"
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => applyFormatting('alignLeft')}
          className="format-button"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('alignCenter')}
          className="format-button"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting('alignRight')}
          className="format-button"
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => applyFormatting('list')}
          className="format-button"
          title="Bullet List"
        >
          <List size={16} />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`textarea ${className}`}
        disabled={disabled}
        required={required}
      />
      <style jsx>{`
        .rich-textarea-container {
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          overflow: hidden;
        }
        
        .formatting-toolbar {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          gap: 0.25rem;
        }
        
        .format-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          background: transparent;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }
        
        .format-button:hover {
          background-color: #e2e8f0;
          color: #334155;
        }
        
        .toolbar-divider {
          width: 1px;
          height: 1.25rem;
          background-color: #e2e8f0;
          margin: 0 0.25rem;
        }
        
        .textarea {
          border: none;
          border-radius: 0;
        }
        
        .textarea:focus {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Textarea;