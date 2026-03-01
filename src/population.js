const BUSHELS_PER_PERSON = 20;

export function calculateStarvation(population, grainForFood) {
  const peopleFed = Math.min(Math.floor(grainForFood / BUSHELS_PER_PERSON), population);
  const peopleDied = population - peopleFed;
  return {
    peopleFed,
    peopleDied,
    survivingPopulation: peopleFed,
  };
}

export function calculateImmigration(acres, grain, population) {
  return Math.floor((20 * acres + grain) / (100 * population));
}
