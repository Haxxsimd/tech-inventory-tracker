import React from 'react';
import { styles } from '../styles';
import { translations, getCategoryLabel, getStatusLabel } from '../translations';
import { getStatusColor } from '../constants';

export const ItemCard = ({ lang, item, projectId, onToggleHave, onDelete }) => {
  const strings = translations[lang];

  return (
    <div
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
          onChange={() => onToggleHave(projectId, item.id)}
          style={styles.checkbox}
          aria-label={`Mark ${item.name} as ${item.haveIt ? 'needed' : 'have'}`}
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
            <span style={styles.badge}>{getCategoryLabel(item.category, lang)}</span>
            <span style={styles.badge}>{getStatusLabel(item.status, lang)}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(projectId, item.id)}
          style={styles.deleteBtn}
          aria-label={`Delete ${item.name}`}
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
  );
};
