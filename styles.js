export const styles = {
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
    fontWeight: '600',
    transition: 'background-color 0.2s'
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
    marginBottom: '12px',
    transition: 'background-color 0.2s'
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
    transition: 'all 0.2s',
    outline: 'none'
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
    marginBottom: '20px',
    transition: 'background-color 0.2s'
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
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0',
    width: '32px',
    height: '32px',
    transition: 'color 0.2s'
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
