export const translations = {
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
    updateProject: 'Update',
    selectProject: 'Select a project to view items',
    items: 'items',
    artiklar: 'artiklar'
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
    updateProject: 'Uppdatera',
    selectProject: 'Välj ett projekt för att visa artiklar',
    items: 'artiklar',
    artiklar: 'artiklar'
  }
};

export const getCategoryLabel = (category, lang) => {
  const labels = {
    component: lang === 'en' ? 'Component' : 'Komponent',
    tools: lang === 'en' ? 'Tools' : 'Verktyg',
    office: lang === 'en' ? 'Office' : 'Kontor',
    electronics: lang === 'en' ? 'Electronics' : 'Elektronik'
  };
  return labels[category];
};

export const getStatusLabel = (status, lang) => {
  const labels = {
    needed: lang === 'en' ? 'Needed' : 'Behövs',
    ordered: lang === 'en' ? 'Ordered' : 'Beställd',
    waiting: lang === 'en' ? 'Waiting' : 'Väntar',
    complete: lang === 'en' ? 'Complete' : 'Klar'
  };
  return labels[status];
};
