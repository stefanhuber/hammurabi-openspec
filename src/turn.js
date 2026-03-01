import { calculateYield } from "./harvest.js";

const SEED_COST_PER_ACRE = 0.5;
const ACRES_PER_PERSON = 10;
const MAX_TURNS = 10;

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

export function processTurn(state, acresToPlant) {
  const seedCost = acresToPlant * SEED_COST_PER_ACRE;
  const yieldPerAcre = calculateYield();
  const totalHarvest = acresToPlant * yieldPerAcre;

  const newGrain = state.grain - seedCost + totalHarvest;

  return {
    newState: {
      ...state,
      grain: newGrain,
      turn: state.turn + 1,
    },
    turnResult: {
      acresToPlant,
      seedCost,
      yieldPerAcre,
      totalHarvest,
    },
  };
}

export function checkGameOver(state) {
  if (state.turn > MAX_TURNS) {
    return { gameOver: true, won: true };
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
