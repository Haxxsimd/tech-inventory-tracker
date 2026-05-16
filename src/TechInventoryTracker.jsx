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
      targetPrice: 'Target Price (SEK)',
      actualPrice: 'Actual Price (SEK)',
      source: 'Where to buy',
      notes: 'Notes / Links',
      haveIt: 'I already have this',
      projects: 'Projects',
      noProjects: 'No projects yet. Create one to start.',
      noItems: 'No items in this project yet.',
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
      targetPrice: 'Målpris (SEK)',
      actualPrice: 'Faktiskt pris (SEK)',
      source: 'Var att köpa',
      notes: 'Anteckningar / Länkar',
      haveIt: 'Jag har redan detta',
      projects: 'Projekt',
      noProjects: 'Inga projekt än. Skapa ett för att börja.',
      noItems: 'Inga artiklar i det här projektet.',
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
    }
  };

  const strings = t[lang];

  const categoryLabels = {
    component: lang === 'en' ? 'Component' : 'Komponent',
    tools: lang === 'en' ? 'Tools' : 'Verktyg',
    office: lang === 'en' ? 'Office' : 'Kontor',
    electronics: lang === 'en' ? 'Electronics' : 'Elektronik'
  };

  const statusLabels = {
    needed: lang === 'en' ? 'Needed' : 'Behövs',
    ordered: lang === 'en' ? 'Ordered' : 'Beställd',
    waiting: lang === 'en' ? 'Waiting' : 'Väntar',
    complete: lang === 'en' ? 'Complete' : 'Klar'
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tech-inventory');
      if (saved) setProjects(JSON.parse(saved));
    } catch (err) {
      console.log('No saved data found');
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('tech-inventory', JSON.stringify(projects));
    } catch (err) {
      console.error('Failed to save:', err);
    }
  }, [projects]);

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
        return { ...p, items: p.items.filter(i => i.id !== itemId) };
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

  const getStatusColor = (status) => ({
    needed: '#ef4444',
    ordered: '#f59e0b',
    waiting: '#3b82f6',
    complete: '#10b981'
  }[status]);

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h1 style={styles.title}>{strings.title}</h1>
        <div style={styles.langToggle}>
          {['en', 'sv'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                ...styles.langBtn,
                backgroundColor: lang === l ? '#3b82f6' : '#1e293b'
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.mainLayout}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <span style={styles.sidebarTitle}>{strings.projects}</span>
          </div>

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
                onChange={e => setNewProjectName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createProject()}
                style={styles.input}
                autoFocus
              />
              <textarea
                placeholder={strings.projectDesc}
                value={newProjectDesc}
                onChange={e => setNewProjectDesc(e.target.value)}
                style={{ ...styles.input, minHeight: '56px', resize: 'vertical' }}
              />
              <div style={styles.formButtons}>
                <button onClick={createProject} style={styles.confirmBtn}>{strings.create}</button>
                <button onClick={() => setShowNewProject(false)} style={styles.cancelBtn}>{strings.cancel}</button>
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
                    backgroundColor: activeProject?.id === project.id ? '#1e3a5f' : '#1e293b',
                    borderLeft: `4px solid ${activeProject?.id === project.id ? '#3b82f6' : 'transparent'}`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={styles.projectName}>{project.name}</div>
                    <div style={styles.projectMeta}>
                      {project.items.length} {lang === 'en' ? 'items' : 'artiklar'}
                      {' · '}
                      {getProjectStats(project).needed} {lang === 'en' ? 'needed' : 'behövs'}
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); deleteProject(project.id); }}
                    style={styles.deleteIconBtn}
                  >×</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main content */}
        <div style={styles.content}>
          {activeProject ? (
            <>
              <div style={styles.projectHeader}>
                <h2 style={styles.projectTitle}>{activeProject.name}</h2>
                {activeProject.description && (
                  <p style={styles.projectDescription}>{activeProject.description}</p>
                )}
              </div>

              {/* Stats */}
              {activeStats && (
                <div style={styles.statsGrid}>
                  {[
                    { label: strings.needed, value: activeStats.needed, color: '#ef4444' },
                    { label: strings.have, value: activeStats.have, color: '#10b981' },
                    { label: strings.total, value: activeStats.total, color: '#94a3b8' },
                    ...(activeStats.budget > 0
                      ? [{ label: strings.budget, value: `${activeStats.budget.toLocaleString()} kr`, color: '#f59e0b' }]
                      : [])
                  ].map(stat => (
                    <div key={stat.label} style={styles.statBox}>
                      <div style={styles.statLabel}>{stat.label}</div>
                      <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Item */}
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
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    style={styles.input}
                    autoFocus
                  />
                  <div style={styles.formRow}>
                    <select
                      value={newItem.category}
                      onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                      style={styles.select}
                    >
                      {Object.entries(categoryLabels).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                    <select
                      value={newItem.status}
                      onChange={e => setNewItem({ ...newItem, status: e.target.value })}
                      style={styles.select}
                    >
                      {Object.entries(statusLabels).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formRow}>
                    <input
                      type="number"
                      placeholder={strings.targetPrice}
                      value={newItem.targetPrice}
                      onChange={e => setNewItem({ ...newItem, targetPrice: e.target.value })}
                      style={styles.select}
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder={strings.actualPrice}
                      value={newItem.actualPrice}
                      onChange={e => setNewItem({ ...newItem, actualPrice: e.target.value })}
                      style={styles.select}
                      min="0"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder={strings.source + ' (t.ex. Tradera, Aliexpress, Webhallen)'}
                    value={newItem.source}
                    onChange={e => setNewItem({ ...newItem, source: e.target.value })}
                    style={styles.input}
                  />
                  <textarea
                    placeholder={strings.notes + ' (specs, links, model numbers...)'}
                    value={newItem.notes}
                    onChange={e => setNewItem({ ...newItem, notes: e.target.value })}
                    style={{ ...styles.input, minHeight: '64px', resize: 'vertical' }}
                  />
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={newItem.haveIt}
                      onChange={e => setNewItem({ ...newItem, haveIt: e.target.checked })}
                      style={styles.checkbox}
                    />
                    {strings.haveIt}
                  </label>
                  <div style={styles.formButtons}>
                    <button onClick={addItemToProject} style={styles.confirmBtn}>{strings.create}</button>
                    <button onClick={() => setShowNewItem(false)} style={styles.cancelBtn}>{strings.cancel}</button>
                  </div>
                </div>
              )}

              {/* Items */}
              <div style={styles.itemsList}>
                {activeProject.items.length === 0 ? (
                  <p style={styles.emptyText}>{strings.noItems}</p>
                ) : (
                  activeProject.items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.itemCard,
                        opacity: item.haveIt ? 0.6 : 1,
                        borderLeft: `4px solid ${getStatusColor(item.status)}`
                      }}
                    >
                      <div style={styles.itemTop}>
                        <input
                          type="checkbox"
                          checked={item.haveIt}
                          onChange={() => toggleHaveItem(activeProject.id, item.id)}
                          style={styles.checkbox}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{
                            ...styles.itemName,
                            textDecoration: item.haveIt ? 'line-through' : 'none',
                            color: item.haveIt ? '#6b7280' : '#f1f5f9'
                          }}>
                            {item.name}
                          </div>
                          <div style={styles.itemBadges}>
                            <span style={styles.badge}>{categoryLabels[item.category]}</span>
                            <span style={{
                              ...styles.badge,
                              color: getStatusColor(item.status),
                              borderColor: getStatusColor(item.status)
                            }}>
                              {statusLabels[item.status]}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteItem(activeProject.id, item.id)}
                          style={styles.deleteIconBtn}
                        >×</button>
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
                            {item.targetPrice && (
                              <><span style={styles.detailLabel}>{strings.targetPrice}:</span>
                              <span style={{ color: '#fbbf24' }}>{item.targetPrice.toLocaleString()} kr</span></>
                            )}
                            {item.actualPrice && (
                              <><span style={{ ...styles.detailLabel, marginLeft: '16px' }}>{strings.actualPrice}:</span>
                              <span style={{ color: '#10b981' }}>{item.actualPrice.toLocaleString()} kr</span></>
                            )}
                          </div>
                        )}
                        {item.notes && (
                          <div style={styles.detailRow}>
                            <span style={styles.detailLabel}>{strings.notes}:</span>
                            <span style={{ wordBreak: 'break-word' }}>{item.notes}</span>
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
              <p style={{ color: '#334155', fontSize: '48px' }}>⬅</p>
              <p style={{ color: '#64748b', marginTop: '12px' }}>
                {lang === 'en' ? 'Select a project or create a new one' : 'Välj ett projekt eller skapa ett nytt'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    overflow: 'hidden'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    backgroundColor: '#0a0f1a',
    borderBottom: '1px solid #1e293b'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
    margin: 0
  },
  langToggle: { display: 'flex', gap: '4px' },
  langBtn: {
    padding: '5px 12px',
    border: 'none',
    borderRadius: '4px',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: {
    width: '260px',
    backgroundColor: '#0a0f1a',
    borderRight: '1px solid #1e293b',
    padding: '16px',
    overflowY: 'auto',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sidebarTitle: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#475569',
    letterSpacing: '1px'
  },
  newProjectBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1e3a5f',
    color: '#93c5fd',
    border: '1px solid #1e40af',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px'
  },
  projectsList: { display: 'flex', flexDirection: 'column', gap: '6px' },
  projectItem: {
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.15s'
  },
  projectName: { fontWeight: '600', fontSize: '14px', marginBottom: '3px' },
  projectMeta: { fontSize: '12px', color: '#64748b' },
  content: { flex: 1, overflowY: 'auto', padding: '24px' },
  projectHeader: { marginBottom: '20px' },
  projectTitle: { fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.5px' },
  projectDescription: { color: '#64748b', fontSize: '14px', margin: 0 },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px',
    marginBottom: '20px'
  },
  statBox: {
    backgroundColor: '#1e293b',
    padding: '12px 14px',
    borderRadius: '6px'
  },
  statLabel: { fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' },
  statValue: { fontSize: '22px', fontWeight: '700' },
  addItemBtn: {
    width: '100%',
    padding: '11px',
    backgroundColor: '#14532d',
    color: '#86efac',
    border: '1px solid #166534',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '16px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '6px'
  },
  itemFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '16px'
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    border: '1px solid #334155',
    padding: '9px 12px',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit',
    width: '100%'
  },
  select: {
    flex: 1,
    backgroundColor: '#0f172a',
    color: '#e5e7eb',
    border: '1px solid #334155',
    padding: '9px 12px',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', color: '#94a3b8' },
  checkbox: { width: '16px', height: '16px', cursor: 'pointer', accentColor: '#3b82f6' },
  formButtons: { display: 'flex', gap: '8px' },
  confirmBtn: {
    flex: 1,
    padding: '9px',
    backgroundColor: '#166534',
    color: '#86efac',
    border: 'none',
    borderRadius: '5px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1,
    padding: '9px',
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '5px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  deleteIconBtn: {
    backgroundColor: 'transparent',
    color: '#475569',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    flexShrink: 0
  },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  itemCard: {
    backgroundColor: '#1e293b',
    padding: '14px 16px',
    borderRadius: '6px'
  },
  itemTop: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' },
  itemName: { fontSize: '15px', fontWeight: '600', marginBottom: '6px' },
  itemBadges: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  badge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '600',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    color: '#94a3b8'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginLeft: '28px',
    fontSize: '13px',
    color: '#94a3b8'
  },
  detailRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' },
  detailLabel: { fontWeight: '600', color: '#475569', minWidth: '80px' },
  emptyText: { color: '#334155', fontSize: '14px', textAlign: 'center', padding: '20px 0' },
  emptyContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%' }
};

export default TechInventoryTracker;
