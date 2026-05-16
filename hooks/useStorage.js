import { useCallback } from 'react';

export const useStorage = () => {
  const loadProjects = useCallback(async () => {
    try {
      const result = await window.storage?.get('tech-inventory');
      if (result?.value) {
        const parsed = JSON.parse(result.value);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
    return [];
  }, []);

  const saveProjects = useCallback(async (projects) => {
    try {
      if (!Array.isArray(projects)) {
        throw new Error('Projects must be an array');
      }
      await window.storage?.set('tech-inventory', JSON.stringify(projects));
      return true;
    } catch (err) {
      console.error('Failed to save projects:', err);
      return false;
    }
  }, []);

  return { loadProjects, saveProjects };
};
