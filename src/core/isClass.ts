export function isClass(data: unknown) {
  return typeof data === 'function' && /^\s*class\s+/.test(data.toString());
}
