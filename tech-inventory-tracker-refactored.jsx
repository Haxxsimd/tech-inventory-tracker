import React, { useState, useEffect, useMemo } from 'react';
import { styles } from './styles';
import { translations } from './translations';
import { ProjectForm } from './components/ProjectForm';
import { ProjectList } from './components/ProjectList';
import { ItemForm } from './components/ItemForm';
import { ItemCard } from './components/ItemCard';
import { StatsPanel } from './components/StatsPanel';
import { useProjectManagement } from './hooks/useProjectManagement';

const TechInventoryTracker = () => {
  const [lang, setLang] = useState('en');
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);

  const strings = translations[lang];

  const {
    createProject,
    deleteProject,
    addItemToProject,
    deleteItem,
    toggleHaveItem,
    getProjectStats
  } = useProjectManagement(projects, setProjects, activeProject, setActiveProject);

  // Load from storage
  useEffect(() => {
    loadProjects();
  }, []);

  // Save to storage
  useEffect(() => {
    saveProjects();
  }, [projects]);

  const loadProjects = async () => {
    try {
      const result = await window.storage?.get('tech-inventory');
      if (result?.value) {
        const parsed = JSON.parse(result.value);
        if (Array.isArray(parsed)) {
          setProjects(parsed);
        }
      }
    } catch (err) {
      console.log('No saved projects yet');
    }
  };

  const saveProjects = async () => {
    try {
      await window.storage?.set('tech-inventory', JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const activeStats = useMemo(
    () => activeProject ? getProjectStats(activeProject) : null,
    [activeProject, getProjectStats]
  );

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h1 style={styles.title}>{strings.title}</h1>
        <div style={styles.langToggle}>
          <button
            onClick={() => setLang('en')}
            style={{
              ...styles.langBtn,
              backgroundColor: lang === 'en' ? '#3b82f6' : '#1e293b'
            }}
            aria-label="Switch to English"
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <button
            onClick={() => setLang('sv')}
            style={{
              ...styles.langBtn,
              backgroundColor: lang === 'sv' ? '#3b82f6' : '#1e293b'
            }}
            aria-label="Switch to Swedish"
            aria-pressed={lang === 'sv'}
          >
            SV
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div style={styles.mainLayout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>{strings.projects}</h2>

          <ProjectForm
            lang={lang}
            isVisible={showNewProject}
            onShow={() => setShowNewProject(true)}
            onSubmit={(name, desc) => {
              if (createProject(name, desc)) {
                setShowNewProject(false);
                return true;
              }
              return false;
            }}
            onCancel={() => setShowNewProject(false)}
          />

          <ProjectList
            lang={lang}
            projects={projects}
            activeProject={activeProject}
            onSelectProject={setActiveProject}
            onDeleteProject={deleteProject}
          />
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {activeProject ? (
            <>
              <div style={styles.projectHeader}>
                <h2 style={styles.projectTitle}>{activeProject.name}</h2>
                {activeProject.description && (
                  <p style={styles.projectDescription}>{activeProject.description}</p>
                )}
              </div>

              <StatsPanel lang={lang} stats={activeStats} />

              <ItemForm
                lang={lang}
                isVisible={showNewItem}
                onShow={() => setShowNewItem(true)}
                onSubmit={(item) => {
                  if (addItemToProject(item)) {
                    setShowNewItem(false);
                    return true;
                  }
                  return false;
                }}
                onCancel={() => setShowNewItem(false)}
              />

              <div style={styles.itemsList}>
                {activeProject.items.length === 0 ? (
                  <p style={styles.emptyText}>{strings.noItems}</p>
                ) : (
                  activeProject.items.map(item => (
                    <ItemCard
                      key={item.id}
                      lang={lang}
                      item={item}
                      projectId={activeProject.id}
                      onToggleHave={toggleHaveItem}
                      onDelete={deleteItem}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            <div style={styles.emptyContent}>
              <p>{strings.selectProject}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechInventoryTracker;
