import React, { useState, useEffect } from 'react';

const TechInventoryTracker = () => {
  const [lang, setLang] = useState('en');
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'component',
    status: 'needed',
    targetPrice: '',
    actualPrice: '',
    source: '',
    notes: '',
    haveIt: false
  });

  const t = {
    en: {
      title: 'Tech Inventory',
      newProject: 'New Project',
      projectName: 'Project name',
      projectDesc: 'Description',
      create: 'Create',
      cancel: 'Cancel',
      addItem: 'Add Item',
      itemName: 'Item / Part',
      category: 'Category',
      status: 'Status',
      targetPrice: 'Target Price',
      actualPrice: 'Actual Price',
      source: 'Where to buy',
      notes: 'Notes / Links',
      haveIt: 'I have this',
      delete: 'Delete',
      projects: 'Projects',
      noProjects: 'No projects yet. Create one to start.',
      noItems: 'No items in this project.',
      stats: 'Stats',
      needed: 'Needed',
      have: 'Have',
      total: 'Total',
      budget: 'Est. Budget',
      statusNeeded: 'Needed',
      statusOrdered: 'Ordered',
      statusWaiting: 'Waiting',
      statusComplete: 'Complete',
      catComponent: 'Component',
      catTools: 'Tools',
      catOffice: 'Office',
      catElectronics: 'Electronics',
      deleteProject: 'Delete Project',
      editProject: 'Edit',
      updateProject: 'Update'
    },
    sv: {
      title: 'Tech-inventarie',
      newProject: 'Nytt projekt',
      projectName: 'Projektnamn',
      projectDesc: 'Beskrivning',
      create: 'Skapa',
      cancel: 'Avbryt',
      addItem: 'Lägg till artikel',
      itemName: 'Artikel / Del',
      category: 'Kategori',
      status: 'Status',
      targetPrice: 'Målpris',
      actualPrice: 'Faktiskt pris',
      source: 'Var att köpa',
      notes: 'Anteckningar / Länkar',
      haveIt: 'Jag har detta',
      delete: 'Ta bort',
      projects: 'Projekt',
      noProjects: 'Inga projekt än. Skapa ett för att börja.',
      noItems: 'Inga artiklar i det här projektet.',
      stats: 'Statistik',
      needed: 'Behövs',
      have: 'Har',
      total: 'Totalt',
      budget: 'Uppskattad budget',
      statusNeeded: 'Behövs',
      statusOrdered: 'Beställd',
      statusWaiting: 'Väntar',
      statusComplete: 'Klar',
      catComponent: 'Komponent',
      catTools: 'Verktyg',
      catOffice: 'Kontor',
      catElectronics: 'Elektronik',
      deleteProject: 'Ta bort projekt',
      editProject: 'Redigera',
      updateProject: 'Uppdatera'
    }
  };

  const strings = t[lang];

  const categoryLabels = {
    component: lang === 'en' ? 'Component' : 'Komponent',
    tools: lang === 'en' ? 'Tools' : 'Verktyg',
    office: lang === 'en' ? 'Office' : 'Kontor',
    electronics: lang === 'en' ? 'Electronics' : 'Elektronik'
  };

const [searchQuery, setSearchQuery] = useState('');

// Filter items by search query
const filteredItems = activeProject?.items.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.source.toLowerCase().includes(searchQuery.toLowerCase())
) || [];

// Add search input in the items section
<input
  type="text"
  placeholder="Search items..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={styles.searchInput}
/>

const [editingItem, setEditingItem] = useState(null);
const [editValues, setEditValues] = useState({});

// Add edit button in item card
<button onClick={() => setEditingItem(item)} style={styles.editBtn}>✏️</button>

// Save edited values
const saveEdit = () => {
  const updated = projects.map(p => {
    if (p.id === activeProject.id) {
      return {
        ...p,
        items: p.items.map(i =>
          i.id === editingItem.id ? { ...i, ...editValues } : i
        )
      };
    }
    return p;
  });
  setProjects(updated);
  setActiveProject(updated.find(p => p.id === activeProject.id));
  setEditingItem(null);
};

// Export to JSON file
const exportData = () => {
  const dataStr = JSON.stringify(projects, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tech-inventory-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Import from JSON file
const importData = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        setProjects(imported);
      }
    } catch {
      alert('Invalid file format');
    }
  };
  reader.readAsText(file);
};

  const statusLabels = {
    needed: lang === 'en' ? 'Needed' : 'Behövs',
    ordered: lang === 'en' ? 'Ordered' : 'Beställd',
    waiting: lang === 'en' ? 'Waiting' : 'Väntar',
    complete: lang === 'en' ? 'Complete' : 'Klar'
  };

 // Save to storage
useEffect(() => {
  try {
    localStorage.setItem('tech-inventory', JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save:', err);
  }
}, [projects]);

// Load from storage
useEffect(() => {
  try {
    const saved = localStorage.getItem('tech-inventory');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  } catch (err) {
    console.log('No saved projects yet');
  }
}, []);
  
  const saveProjects = async () => {
    try {
      await window.storage?.set('tech-inventory', JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;

    const project = {
      id: Date.now(),
      name: newProjectName,
      description: newProjectDesc,
      items: [],
      createdDate: new Date().toLocaleDateString(lang === 'sv' ? 'sv-SE' : 'en-US')
    };

    setProjects([...projects, project]);
    setNewProjectName('');
    setNewProjectDesc('');
    setShowNewProject(false);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    if (activeProject?.id === id) setActiveProject(null);
  };

  const addItemToProject = () => {
    if (!activeProject || !newItem.name.trim()) return;

    const updated = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          items: [
            ...p.items,
            {
              id: Date.now(),
              ...newItem,
              targetPrice: newItem.targetPrice ? parseFloat(newItem.targetPrice) : null,
              actualPrice: newItem.actualPrice ? parseFloat(newItem.actualPrice) : null
            }
          ]
        };
      }
      return p;
    });

    setProjects(updated);
    setActiveProject(updated.find(p => p.id === activeProject.id));
    setNewItem({
      name: '',
      category: 'component',
      status: 'needed',
      targetPrice: '',
      actualPrice: '',
      source: '',
      notes: '',
      haveIt: false
    });
    setShowNewItem(false);
  };

  const deleteItem = (projectId, itemId) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          items: p.items.filter(i => i.id !== itemId)
        };
      }
      return p;
    });

    setProjects(updated);
    setActiveProject(updated.find(p => p.id === projectId));
  };

  const toggleHaveItem = (projectId, itemId) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          items: p.items.map(i =>
            i.id === itemId ? { ...i, haveIt: !i.haveIt } : i
          )
        };
      }
      return p;
    });

    setProjects(updated);
    setActiveProject(updated.find(p => p.id === projectId));
  };

  // Calculate project stats
  const getProjectStats = (project) => {
    const items = project.items;
    const needed = items.filter(i => !i.haveIt).length;
    const have = items.filter(i => i.haveIt).length;
    const budget = items
      .filter(i => !i.haveIt && i.targetPrice)
      .reduce((sum, i) => sum + i.targetPrice, 0);

    return { needed, have, total: items.length, budget };
  };

  const activeStats = activeProject ? getProjectStats(activeProject) : null;

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.title}>{strings.title}</h1>
        <div style={styles.langToggle}>
          <button
            onClick={() => setLang('en')}
            style={{
              ...styles.langBtn,
              backgroundColor: lang === 'en' ? '#3b82f6' : '#1e293b'
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLang('sv')}
            style={{
              ...styles.langBtn,
              backgroundColor: lang === 'sv' ? '#3b82f6' : '#1e293b'
            }}
          >
            SV
          </button>
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Projects Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>{strings.projects}</h2>

          {!showNewProject ? (
            <button onClick={() => setShowNewProject(true)} style={styles.newProjectBtn}>
              + {strings.newProject}
            </button>
          ) : (
            <div style={styles.formContainer}>
              <input
                type="text"
                placeholder={strings.projectName}
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder={strings.projectDesc}
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                style={{ ...styles.input, minHeight: '60px' }}
              />
              <div style={styles.formButtons}>
                <button onClick={createProject} style={styles.confirmBtn}>
                  {strings.create}
                </button>
                <button onClick={() => setShowNewProject(false)} style={styles.cancelBtn}>
                  {strings.cancel}
                </button>
              </div>
            </div>
          )}

          <div style={styles.projectsList}>
            {projects.length === 0 ? (
              <p style={styles.emptyText}>{strings.noProjects}</p>
            ) : (
              projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  style={{
                    ...styles.projectItem,
                    backgroundColor: activeProject?.id === project.id ? '#1e40af' : '#1e293b',
                    borderLeft: activeProject?.id === project.id ? '4px solid #3b82f6' : '4px solid transparent'
                  }}
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
                      deleteProject(project.id);
                    }}
                    style={styles.deleteBtn}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {activeProject ? (
            <>
              <div style={styles.projectHeader}>
                <div>
                  <h2 style={styles.projectTitle}>{activeProject.name}</h2>
                  {activeProject.description && (
                    <p style={styles.projectDescription}>{activeProject.description}</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              {activeStats && (
                <div style={styles.statsContainer}>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>{strings.needed}</div>
                    <div style={styles.statValue}>{activeStats.needed}</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>{strings.have}</div>
                    <div style={styles.statValue}>{activeStats.have}</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>{strings.total}</div>
                    <div style={styles.statValue}>{activeStats.total}</div>
                  </div>
                  {activeStats.budget > 0 && (
                    <div style={styles.statBox}>
                      <div style={styles.statLabel}>{strings.budget}</div>
                      <div style={styles.statValue}>${activeStats.budget.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}

              {/* New Item Form */}
              {!showNewItem ? (
                <button onClick={() => setShowNewItem(true)} style={styles.addItemBtn}>
                  + {strings.addItem}
                </button>
              ) : (
                <div style={styles.itemFormContainer}>
                  <input
                    type="text"
                    placeholder={strings.itemName}
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    style={styles.input}
                  />

                  <div style={styles.formRow}>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      style={styles.select}
                    >
                      <option value="component">{categoryLabels.component}</option>
                      <option value="tools">{categoryLabels.tools}</option>
                      <option value="office">{categoryLabels.office}</option>
                      <option value="electronics">{categoryLabels.electronics}</option>
                    </select>

                    <select
                      value={newItem.status}
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                      style={styles.select}
                    >
                      <option value="needed">{statusLabels.needed}</option>
                      <option value="ordered">{statusLabels.ordered}</option>
                      <option value="waiting">{statusLabels.waiting}</option>
                      <option value="complete">{statusLabels.complete}</option>
                    </select>
                  </div>

                  <div style={styles.formRow}>
                    <input
                      type="number"
                      placeholder={strings.targetPrice}
                      value={newItem.targetPrice}
                      onChange={(e) => setNewItem({ ...newItem, targetPrice: e.target.value })}
                      style={styles.select}
                      step="0.01"
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder={strings.actualPrice}
                      value={newItem.actualPrice}
                      onChange={(e) => setNewItem({ ...newItem, actualPrice: e.target.value })}
                      style={styles.select}
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder={strings.source}
                    value={newItem.source}
                    onChange={(e) => setNewItem({ ...newItem, source: e.target.value })}
                    style={styles.input}
                  />

                  <textarea
                    placeholder={strings.notes}
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    style={{ ...styles.input, minHeight: '60px' }}
                  />

                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={newItem.haveIt}
                      onChange={(e) => setNewItem({ ...newItem, haveIt: e.target.checked })}
                      style={styles.checkbox}
                    />
                    {strings.haveIt}
                  </label>

                  <div style={styles.formButtons}>
                    <button onClick={addItemToProject} style={styles.confirmBtn}>
                      {strings.create}
                    </button>
                    <button onClick={() => setShowNewItem(false)} style={styles.cancelBtn}>
                      {strings.cancel}
                    </button>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div style={styles.itemsList}>
                {activeProject.items.length === 0 ? (
                  <p style={styles.emptyText}>{strings.noItems}</p>
                ) : (
                  activeProject.items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.itemCard,
                        opacity: item.haveIt ? 0.7 : 1,
                        borderLeft: `4px solid ${getStatusColor(item.status)}`
                      }}
                    >
                      <div style={styles.itemHeader}>
                        <input
                          type="checkbox"
                          checked={item.haveIt}
                          onChange={() => toggleHaveItem(activeProject.id, item.id)}
                          style={styles.checkbox}
                        />
                        <div style={styles.itemTitleSection}>
                          <div
                            style={{
                              ...styles.itemName,
                              textDecoration: item.haveIt ? 'line-through' : 'none'
                            }}
                          >
                            {item.name}
                          </div>
                          <div style={styles.itemBadges}>
                            <span style={styles.badge}>{categoryLabels[item.category]}</span>
                            <span style={styles.badge}>{statusLabels[item.status]}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteItem(activeProject.id, item.id)}
                          style={styles.deleteBtn}
                        >
                          ×
                        </button>
                      </div>

                      <div style={styles.itemDetails}>
                        {item.source && (
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>{strings.source}:</span>
                            <span>{item.source}</span>
                          </div>
                        )}
                        {(item.targetPrice || item.actualPrice) && (
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>{strings.targetPrice}:</span>
                            <span>${item.targetPrice?.toFixed(2) || 'N/A'}</span>
                            {item.actualPrice && (
                              <>
                                <span style={{ marginLeft: '16px' }}>{strings.actualPrice}:</span>
                                <span>${item.actualPrice.toFixed(2)}</span>
                              </>
                            )}
                          </div>
                        )}
                        {item.notes && (
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>{strings.notes}:</span>
                            <span>{item.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div style={styles.emptyContent}>
              <p>{lang === 'en' ? 'Select a project to view items' : 'Välj ett projekt för att visa artiklar'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    needed: '#ef4444',
    ordered: '#f59e0b',
    waiting: '#3b82f6',
    complete: '#10b981'
  };
  return colors[status];
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    overflow: 'hidden'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#0a0f1a',
    borderBottom: '1px solid #1e293b'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    margin: 0
  },
  langToggle: {
    display: 'flex',
    gap: '4px'
  },
  langBtn: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#0f172a',
    borderRight: '1px solid #1e293b',
    padding: '16px',
    overflowY: 'auto',
    flexShrink: 0
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#94a3b8',
    margin: '0 0 12px 0',
    letterSpacing: '0.5px'
  },
  newProjectBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    marginBottom: '12px'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  projectItem: {
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s'
  },
  projectItemContent: {
    flex: 1
  },
  projectName: {
    fontWeight: '600',
    fontSize: '14px'
  },
  projectMeta: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '4px'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  projectHeader: {
    marginBottom: '24px'
  },
  projectTitle: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0'
  },
  projectDescription: {
    color: '#94a3b8',
    margin: '0',
    fontSize: '14px'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },
  statBox: {
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'center'
  },
  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    marginTop: '4px'
  },
  addItemBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    marginBottom: '20px'
  },
  formContainer: {
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  itemFormContainer: {
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    border: '1px solid #334155',
    padding: '10px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit'
  },
  select: {
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    border: '1px solid #334155',
    padding: '10px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#3b82f6'
  },
  formButtons: {
    display: 'flex',
    gap: '8px'
  },
  confirmBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0',
    width: '32px',
    height: '32px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  itemCard: {
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '6px'
  },
  itemHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'flex-start'
  },
  itemTitleSection: {
    flex: 1
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '6px'
  },
  itemBadges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: '#334155',
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '4px',
    fontWeight: '600'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '26px',
    fontSize: '13px',
    color: '#cbd5e1'
  },
  detailRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  detailLabel: {
    fontWeight: '600',
    color: '#94a3b8',
    minWidth: '100px'
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    padding: '20px 10px',
    fontSize: '14px'
  },
  emptyContent: {
    textAlign: 'center',
    color: '#6b7280',
    paddingTop: '40px'
  }
};

export default TechInventoryTracker;
