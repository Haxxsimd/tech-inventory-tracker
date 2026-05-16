import React from 'react';
import { styles } from '../styles';
import { translations } from '../translations';

export const StatsPanel = ({ lang, stats }) => {
  if (!stats) return null;

  const strings = translations[lang];

  return (
    <div style={styles.statsContainer}>
      <div style={styles.statBox}>
        <div style={styles.statLabel}>{strings.needed}</div>
        <div style={styles.statValue} aria-label={`Needed: ${stats.needed}`}>
          {stats.needed}
        </div>
      </div>
      <div style={styles.statBox}>
        <div style={styles.statLabel}>{strings.have}</div>
        <div style={styles.statValue} aria-label={`Have: ${stats.have}`}>
          {stats.have}
        </div>
      </div>
      <div style={styles.statBox}>
        <div style={styles.statLabel}>{strings.total}</div>
        <div style={styles.statValue} aria-label={`Total: ${stats.total}`}>
          {stats.total}
        </div>
      </div>
      {stats.budget > 0 && (
        <div style={styles.statBox}>
          <div style={styles.statLabel}>{strings.budget}</div>
          <div style={styles.statValue} aria-label={`Budget: $${stats.budget.toFixed(2)}`}>
            ${stats.budget.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
