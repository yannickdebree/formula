export function mergeObjects(array: Array<any>) {
  return array.reduce((acc, d) => ({ ...acc, ...d }), {});
}
