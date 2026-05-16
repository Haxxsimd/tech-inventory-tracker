import React from 'react';
import { styles } from '../styles';
import { translations } from '../translations';

export const ProjectList = ({ lang, projects, activeProject, onSelectProject, onDeleteProject }) => {
  const strings = translations[lang];

  return (
    <div style={styles.projectsList}>
      {projects.length === 0 ? (
        <p style={styles.emptyText}>{strings.noProjects}</p>
      ) : (
        projects.map(project => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(project);
              }
            }}
            style={{
              ...styles.projectItem,
              backgroundColor: activeProject?.id === project.id ? '#1e40af' : '#1e293b',
              borderLeft: activeProject?.id === project.id ? '4px solid #3b82f6' : '4px solid transparent'
            }}
            role="button"
            tabIndex={0}
            aria-pressed={activeProject?.id === project.id}
            aria-label={`Project: ${project.name} with ${project.items.length} items`}
          >
            <div style={styles.projectItemContent}>
              <div style={styles.projectName}>{project.name}</div>
              <div style={styles.projectMeta}>
                {project.items.length} {lang === 'en' ? 'items' : 'artiklar'}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
              style={styles.deleteBtn}
              aria-label={`Delete project ${project.name}`}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
};
