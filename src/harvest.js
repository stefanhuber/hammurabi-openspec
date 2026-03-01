export function calculateYield() {
  const possibleYields = [2, 3, 4, 5, 6];
  const index = Math.floor(Math.random() * possibleYields.length);
  return possibleYields[index];
}
