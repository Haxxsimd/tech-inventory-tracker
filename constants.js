export const getStatusColor = (status) => {
  const colors = {
    needed: '#ef4444',
    ordered: '#f59e0b',
    waiting: '#3b82f6',
    complete: '#10b981'
  };
  return colors[status] || '#94a3b8';
};

export const defaultNewItem = {
  name: '',
  category: 'component',
  status: 'needed',
  targetPrice: '',
  actualPrice: '',
  source: '',
  notes: '',
  haveIt: false
};

export const categoryOptions = [
  { value: 'component', label: 'Component' },
  { value: 'tools', label: 'Tools' },
  { value: 'office', label: 'Office' },
  { value: 'electronics', label: 'Electronics' }
];

export const statusOptions = [
  { value: 'needed', label: 'Needed' },
  { value: 'ordered', label: 'Ordered' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'complete', label: 'Complete' }
];
