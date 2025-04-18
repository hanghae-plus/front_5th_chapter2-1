let lastSel: string | undefined = undefined;

export function updateLastSelValue(newValue: string) {
  lastSel = newValue;
}

export function getLastSelValue(): string | undefined {
  return lastSel;
}
