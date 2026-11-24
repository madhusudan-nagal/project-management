export function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback; 
  } catch {
    localStorage.removeItem(key); 
    return fallback;
  }
}

//save ay values in the local storage
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}