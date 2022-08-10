function isANumber(n: number) {
    return Number.isInteger(n) && !Number.isNaN(n);
}

export function isADivisibleNumber(n: number) {
    return isANumber(n) && n !== 0;
}