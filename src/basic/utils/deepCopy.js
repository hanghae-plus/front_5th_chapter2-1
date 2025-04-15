export const deepCopy = (obj, weakMap = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map)
    return new Map(
      [...obj].map(([k, v]) => [deepCopy(k, weakMap), deepCopy(v, weakMap)]),
    );
  if (obj instanceof Set)
    return new Set([...obj].map((v) => deepCopy(v, weakMap)));

  // 순환 참조 방지
  if (weakMap.has(obj)) return weakMap.get(obj);

  const copyed = Array.isArray(obj) ? [] : {};
  weakMap.set(obj, copyed);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copyed[key] = deepCopy(obj[key], weakMap);
    }
  }

  return copyed;
};
