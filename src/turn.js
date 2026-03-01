import { calculateYield } from "./harvest.js";
import { calculateStarvation, calculateImmigration } from "./population.js";
import { rollPlague } from "./plague.js";
import { rollRats } from "./rats.js";

const SEED_COST_PER_ACRE = 0.5;
const ACRES_PER_PERSON = 10;
const MAX_TURNS = 10;
const STARVATION_DEFEAT_THRESHOLD = 0.45;

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

  // Plague: applied before starvation
  const plagueResult = rollPlague(state.population);
  const postPlaguePopulation = state.population - plagueResult.deaths;

  // Starvation: calculated against post-plague population
  const starvation = calculateStarvation(postPlaguePopulation, grainForFood);
  const survivingPopulation = starvation.survivingPopulation;

  // Starvation defeat: more than 45% of post-plague population starved
  const starvationDefeat =
    postPlaguePopulation > 0 &&
    starvation.peopleDied > STARVATION_DEFEAT_THRESHOLD * postPlaguePopulation;

  const immigrants = starvation.peopleDied === 0
    ? calculateImmigration(state.land, grainAfterFoodAndSeeds, survivingPopulation)
    : 0;

  // Harvest and rats
  const yieldPerAcre = calculateYield();
  const totalHarvest = acresToPlant * yieldPerAcre;
  const ratsResult = rollRats(totalHarvest);
  const harvestAfterRats = totalHarvest - ratsResult.grainDestroyed;
  const newGrain = grainAfterFoodAndSeeds + harvestAfterRats;

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
      plagueOccurred: plagueResult.occurred,
      plagueDeaths: plagueResult.deaths,
      ratsOccurred: ratsResult.occurred,
      grainDestroyedByRats: ratsResult.grainDestroyed,
      starvationDefeat,
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
