export let lastSelectState = null;

export function setLastSelectState(item) {
  lastSelectState = item;
}

export function getLastSelectState() {
  return lastSelectState;
}
