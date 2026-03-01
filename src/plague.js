export function rollPlague(population, random = Math.random()) {
  if (random < 0.15) {
    const deaths = Math.floor(population / 2);
    return { occurred: true, deaths };
  }
  return { occurred: false, deaths: 0 };
}
