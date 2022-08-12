export function isANumber(n: number) {
  return !Number.isNaN(n);
}

export function isAnInteger(n: number) {
  return isANumber(n) && Number.isInteger(n);
}

export function isADivisibleNumber(n: number) {
  return isAnInteger(n) && n !== 0;
}
