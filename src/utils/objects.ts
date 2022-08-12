export function mergeObjects<T>(array: Array<T>) {
  return array.reduce((acc, d) => ({ ...acc, ...d }), {});
}
