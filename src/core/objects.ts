export function mergeObjects(array: Array<any>): any {
  return array.reduce((acc, d) => ({ ...acc, ...d }), {});
}
