import { calculateYield } from "./harvest.js";
import { calculateStarvation, calculateImmigration } from "./population.js";

const SEED_COST_PER_ACRE = 0.5;
const ACRES_PER_PERSON = 10;
const MAX_TURNS = 10;

export function validateFoodAllocation(grainForFood, state) {
  if (!Number.isInteger(grainForFood) || grainForFood < 0) {
    return { valid: false, error: "Food allocation must be a non-negative integer." };
  }

  if (grainForFood > state.grain) {
    return {
      valid: false,
      error: `Not enough grain. You only have ${state.grain} bushels.`,
    };
  }

  return { valid: true };
}

export function validateAcresToPlant(acresToPlant, state) {
  if (!Number.isInteger(acresToPlant) || acresToPlant < 0) {
    return { valid: false, error: "Acres to plant must be a non-negative integer." };
  }

  const maxByGrain = Math.floor(state.grain / SEED_COST_PER_ACRE);
  if (acresToPlant > maxByGrain) {
    return {
      valid: false,
      error: `Not enough grain. You can plant at most ${maxByGrain} acres (you have ${state.grain} bushels).`,
    };
  }

  const maxByPopulation = state.population * ACRES_PER_PERSON;
  if (acresToPlant > maxByPopulation) {
    return {
      valid: false,
      error: `Not enough people. You can plant at most ${maxByPopulation} acres (${state.population} people × ${ACRES_PER_PERSON} acres each).`,
    };
  }

  if (acresToPlant > state.land) {
    return {
      valid: false,
      error: `Not enough land. You only have ${state.land} acres.`,
    };
  }

  return { valid: true };
}

export function processTurn(state, grainForFood, acresToPlant, landTradeInfo) {
  const seedCost = acresToPlant * SEED_COST_PER_ACRE;
  const grainAfterFoodAndSeeds = state.grain - grainForFood - seedCost;

  const starvation = calculateStarvation(state.population, grainForFood);
  const survivingPopulation = starvation.survivingPopulation;

  const immigrants = starvation.peopleDied === 0
    ? calculateImmigration(state.land, grainAfterFoodAndSeeds, survivingPopulation)
    : 0;

  const yieldPerAcre = calculateYield();
  const totalHarvest = acresToPlant * yieldPerAcre;
  const newGrain = grainAfterFoodAndSeeds + totalHarvest;

  return {
    newState: {
      ...state,
      grain: newGrain,
      population: survivingPopulation + immigrants,
      turn: state.turn + 1,
    },
    turnResult: {
      grainForFood,
      acresToPlant,
      seedCost,
      yieldPerAcre,
      totalHarvest,
      peopleFed: starvation.peopleFed,
      peopleDied: starvation.peopleDied,
      immigrants,
      ...(landTradeInfo || {}),
    },
  };
}

export function checkGameOver(state) {
  if (state.turn > MAX_TURNS) {
    return { gameOver: true, won: true };
  }

  if (state.population === 0) {
    return { gameOver: true, won: false };
  }

  const maxPlantable = Math.min(
    Math.floor(state.grain / SEED_COST_PER_ACRE),
    state.population * ACRES_PER_PERSON,
    state.land,
  );

  if (state.grain < SEED_COST_PER_ACRE && maxPlantable === 0) {
    return { gameOver: true, won: false };
  }

  return { gameOver: false };
}
