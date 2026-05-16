import React, { useState } from 'react';
import { styles } from '../styles';
import { translations } from '../translations';

export const ProjectForm = ({ lang, isVisible, onShow, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const strings = translations[lang];

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (onSubmit(name, desc)) {
      setName('');
      setDesc('');
    }
  };

  if (!isVisible) {
    return (
      <button 
        onClick={onShow} 
        style={styles.newProjectBtn}
        aria-label="Create a new project"
      >
        + {strings.newProject}
      </button>
    );
  }

  return (
    <div style={styles.formContainer}>
      <input
        type="text"
        placeholder={strings.projectName}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        aria-label={strings.projectName}
      />
      <textarea
        placeholder={strings.projectDesc}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ ...styles.input, minHeight: '60px' }}
        aria-label={strings.projectDesc}
      />
      <div style={styles.formButtons}>
        <button 
          onClick={handleSubmit} 
          style={styles.confirmBtn}
          aria-label={strings.create}
        >
          {strings.create}
        </button>
        <button 
          onClick={() => {
            setName('');
            setDesc('');
            onCancel();
          }} 
          style={styles.cancelBtn}
          aria-label={strings.cancel}
        >
          {strings.cancel}
        </button>
      </div>
    </div>
  );
};
