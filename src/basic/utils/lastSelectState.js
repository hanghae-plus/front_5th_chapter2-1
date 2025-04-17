export default function lastSelectState() {
  let lastSelectState = null;

  function setLastSelectState(item) {
    lastSelectState = item;
  }
  function getLastSelectState() {
    return lastSelectState;
  }

  return { getLastSelectState, setLastSelectState };
}
