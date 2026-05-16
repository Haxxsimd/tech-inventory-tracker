import React, { useState } from 'react';
import { styles } from '../styles';
import { translations, getCategoryLabel, getStatusLabel } from '../translations';

export const ItemForm = ({ lang, isVisible, onShow, onSubmit, onCancel }) => {
  const [item, setItem] = useState({
    name: '',
    category: 'component',
    status: 'needed',
    targetPrice: '',
    actualPrice: '',
    source: '',
    notes: '',
    haveIt: false
  });

  const strings = translations[lang];

  const handleSubmit = () => {
    if (!item.name.trim()) return;

    if (onSubmit({
      ...item,
      targetPrice: item.targetPrice ? parseFloat(item.targetPrice) : null,
      actualPrice: item.actualPrice ? parseFloat(item.actualPrice) : null
    })) {
      setItem({
        name: '',
        category: 'component',
        status: 'needed',
        targetPrice: '',
        actualPrice: '',
        source: '',
        notes: '',
        haveIt: false
      });
    }
  };

  if (!isVisible) {
    return (
      <button 
        onClick={onShow} 
        style={styles.addItemBtn}
        aria-label="Add a new item"
      >
        + {strings.addItem}
      </button>
    );
  }

  return (
    <div style={styles.itemFormContainer}>
      <input
        type="text"
        placeholder={strings.itemName}
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        style={styles.input}
        aria-label={strings.itemName}
      />

      <div style={styles.formRow}>
        <select
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
          style={styles.select}
          aria-label={strings.category}
        >
          <option value="component">{getCategoryLabel('component', lang)}</option>
          <option value="tools">{getCategoryLabel('tools', lang)}</option>
          <option value="office">{getCategoryLabel('office', lang)}</option>
          <option value="electronics">{getCategoryLabel('electronics', lang)}</option>
        </select>

        <select
          value={item.status}
          onChange={(e) => setItem({ ...item, status: e.target.value })}
          style={styles.select}
          aria-label={strings.status}
        >
          <option value="needed">{getStatusLabel('needed', lang)}</option>
          <option value="ordered">{getStatusLabel('ordered', lang)}</option>
          <option value="waiting">{getStatusLabel('waiting', lang)}</option>
          <option value="complete">{getStatusLabel('complete', lang)}</option>
        </select>
      </div>

      <div style={styles.formRow}>
        <input
          type="number"
          placeholder={strings.targetPrice}
          value={item.targetPrice}
          onChange={(e) => setItem({ ...item, targetPrice: e.target.value })}
          style={styles.select}
          step="0.01"
          min="0"
          aria-label={strings.targetPrice}
        />
        <input
          type="number"
          placeholder={strings.actualPrice}
          value={item.actualPrice}
          onChange={(e) => setItem({ ...item, actualPrice: e.target.value })}
          style={styles.select}
          step="0.01"
          min="0"
          aria-label={strings.actualPrice}
        />
      </div>

      <input
        type="text"
        placeholder={strings.source}
        value={item.source}
        onChange={(e) => setItem({ ...item, source: e.target.value })}
        style={styles.input}
        aria-label={strings.source}
      />

      <textarea
        placeholder={strings.notes}
        value={item.notes}
        onChange={(e) => setItem({ ...item, notes: e.target.value })}
        style={{ ...styles.input, minHeight: '60px' }}
        aria-label={strings.notes}
      />

      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={item.haveIt}
          onChange={(e) => setItem({ ...item, haveIt: e.target.checked })}
          style={styles.checkbox}
          aria-label={strings.haveIt}
        />
        {strings.haveIt}
      </label>

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
            setItem({
              name: '',
              category: 'component',
              status: 'needed',
              targetPrice: '',
              actualPrice: '',
              source: '',
              notes: '',
              haveIt: false
            });
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
