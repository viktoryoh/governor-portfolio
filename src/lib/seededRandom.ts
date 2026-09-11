export function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;

  return value - Math.floor(value);
}

export function rangedRandom(seed: number, min: number, max: number) {
  return Number((min + seededRandom(seed) * (max - min)).toFixed(3));
}
