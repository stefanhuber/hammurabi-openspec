export function rollRats(totalHarvest, random = Math.random(), destructionRandom = Math.random()) {
  if (random < 0.40) {
    const destructionRate = 0.10 + destructionRandom * 0.20;
    const grainDestroyed = Math.floor(totalHarvest * destructionRate);
    return { occurred: true, grainDestroyed };
  }
  return { occurred: false, grainDestroyed: 0 };
}
