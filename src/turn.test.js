import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateFoodAllocation,
  validateAcresToPlant,
  processTurn,
  checkGameOver,
} from "./turn.js";
import * as harvest from "./harvest.js";
import * as plague from "./plague.js";
import * as rats from "./rats.js";

describe("validateFoodAllocation", () => {
  const defaultState = { grain: 2800, population: 100, land: 1000, turn: 1 };

  it("should accept valid food allocation", () => {
    const result = validateFoodAllocation(2000, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should accept zero food allocation", () => {
    const result = validateFoodAllocation(0, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should reject negative values", () => {
    const result = validateFoodAllocation(-1, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should reject non-integer values", () => {
    const result = validateFoodAllocation(10.5, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should reject when exceeding grain stock", () => {
    const result = validateFoodAllocation(2801, defaultState);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("grain");
  });

  it("should allow allocating all grain as food", () => {
    const result = validateFoodAllocation(2800, defaultState);
    expect(result.valid).toBe(true);
  });
});

describe("validateAcresToPlant", () => {
  const defaultState = { grain: 2800, population: 100, land: 1000, turn: 1 };

  it("should accept a valid number of acres", () => {
    const result = validateAcresToPlant(500, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should reject negative values", () => {
    const result = validateAcresToPlant(-1, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should reject non-integer values", () => {
    const result = validateAcresToPlant(10.5, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should reject when grain is insufficient", () => {
    const state = { ...defaultState, grain: 100 };
    const result = validateAcresToPlant(201, state);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("grain");
  });

  it("should allow max acres by grain", () => {
    const state = { ...defaultState, grain: 100 };
    const result = validateAcresToPlant(200, state);
    expect(result.valid).toBe(true);
  });

  it("should reject when population is insufficient", () => {
    const state = { ...defaultState, population: 50 };
    const result = validateAcresToPlant(501, state);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("people");
  });

  it("should allow max acres by population", () => {
    const state = { ...defaultState, population: 50 };
    const result = validateAcresToPlant(500, state);
    expect(result.valid).toBe(true);
  });

  it("should reject when land is insufficient", () => {
    const state = { ...defaultState, land: 300 };
    const result = validateAcresToPlant(301, state);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("land");
  });

  it("should allow planting exactly all available land", () => {
    const state = { ...defaultState, land: 300 };
    const result = validateAcresToPlant(300, state);
    expect(result.valid).toBe(true);
  });

  it("should accept zero acres", () => {
    const result = validateAcresToPlant(0, defaultState);
    expect(result.valid).toBe(true);
  });
});

describe("processTurn", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(plague, "rollPlague").mockReturnValue({ occurred: false, deaths: 0 });
    vi.spyOn(rats, "rollRats").mockReturnValue({ occurred: false, grainDestroyed: 0 });
  });

  it("should deduct food and seed cost from grain", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(2);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState, turnResult } = processTurn(state, 2000, 100);
    // grain: 2800 - 2000 (food) - 50 (seeds) + 200 (harvest) = 950
    expect(turnResult.seedCost).toBe(50);
    expect(turnResult.grainForFood).toBe(2000);
    expect(newState.grain).toBe(950);
  });

  it("should add harvest to grain stock", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(4);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState, turnResult } = processTurn(state, 2000, 200);
    // grain: 2800 - 2000 - 100 + 800 = 1500
    expect(turnResult.totalHarvest).toBe(800);
    expect(newState.grain).toBe(1500);
  });

  it("should advance turn number by 1", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState } = processTurn(state, 2000, 100);
    expect(newState.turn).toBe(2);
  });

  it("should not mutate the original state", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    processTurn(state, 2000, 100);
    expect(state.grain).toBe(2800);
    expect(state.turn).toBe(1);
    expect(state.population).toBe(100);
  });

  it("should calculate starvation when food is insufficient", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState, turnResult } = processTurn(state, 1999, 100);
    expect(turnResult.peopleFed).toBe(99);
    expect(turnResult.peopleDied).toBe(1);
    expect(newState.population).toBe(99); // no immigration when people die
  });

  it("should not have immigration when people starve", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { turnResult } = processTurn(state, 500, 100);
    expect(turnResult.peopleDied).toBe(75);
    expect(turnResult.immigrants).toBe(0);
  });

  it("should calculate immigration when no one starves", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // food: 2000, seeds: 500 * 0.5 = 250, remaining: 2800 - 2000 - 250 = 550
    // immigration: floor((20 * 1000 + 550) / (100 * 100)) = floor(20550 / 10000) = 2
    const { newState, turnResult } = processTurn(state, 2000, 500);
    expect(turnResult.peopleDied).toBe(0);
    expect(turnResult.immigrants).toBe(2);
    expect(newState.population).toBe(102);
  });

  it("should use pre-harvest grain for immigration calculation", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(6);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // food: 2000, seeds: 100 * 0.5 = 50, remaining before harvest: 2800 - 2000 - 50 = 750
    // immigration: floor((20 * 1000 + 750) / (100 * 100)) = floor(20750 / 10000) = 2
    // harvest: 100 * 6 = 600 (added after immigration is calculated)
    const { turnResult } = processTurn(state, 2000, 100);
    expect(turnResult.immigrants).toBe(2);
  });

  it("should include land trade info in turn result when provided", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const landTradeInfo = { acresToBuy: 0, acresToSell: 50, landPrice: 20, tradeCost: -1000 };
    const { turnResult } = processTurn(state, 2000, 100, landTradeInfo);
    expect(turnResult.acresToBuy).toBe(0);
    expect(turnResult.acresToSell).toBe(50);
    expect(turnResult.landPrice).toBe(20);
  });

  it("should work without land trade info", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { turnResult } = processTurn(state, 2000, 100);
    expect(turnResult.acresToBuy).toBeUndefined();
  });

  it("should halve population before starvation when plague occurs", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    plague.rollPlague.mockReturnValue({ occurred: true, deaths: 50 });
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // Post-plague population: 50
    // Food: 2000 bushels → feeds 100 people, but only 50 alive → all 50 fed
    const { newState, turnResult } = processTurn(state, 2000, 100);
    expect(turnResult.plagueOccurred).toBe(true);
    expect(turnResult.plagueDeaths).toBe(50);
    expect(turnResult.peopleDied).toBe(0);
    expect(newState.population).toBeGreaterThanOrEqual(50);
  });

  it("should calculate starvation against post-plague population", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    plague.rollPlague.mockReturnValue({ occurred: true, deaths: 50 });
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // Post-plague population: 50
    // Food: 500 bushels → feeds 25, so 25 starve out of 50
    const { turnResult } = processTurn(state, 500, 100);
    expect(turnResult.peopleDied).toBe(25);
  });

  it("should reduce harvest when rats occur", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(4);
    rats.rollRats.mockReturnValue({ occurred: true, grainDestroyed: 80 });
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // grain: 2800 - 2000(food) - 100(seeds) + (800 - 80)(harvest after rats) = 1420
    const { newState, turnResult } = processTurn(state, 2000, 200);
    expect(turnResult.ratsOccurred).toBe(true);
    expect(turnResult.grainDestroyedByRats).toBe(80);
    expect(turnResult.totalHarvest).toBe(800);
    expect(newState.grain).toBe(1420);
  });

  it("should set starvationDefeat when >45% of post-plague population starves", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    // Plague: 100 → 50
    plague.rollPlague.mockReturnValue({ occurred: true, deaths: 50 });
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // Post-plague: 50. Feed with 480 → feeds 24 → 26 starve → 52% > 45% → defeat
    const { turnResult } = processTurn(state, 480, 100);
    expect(turnResult.peopleDied).toBe(26);
    expect(turnResult.starvationDefeat).toBe(true);
  });

  it("should not set starvationDefeat when <=45% of post-plague population starves", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    // Plague: 100 → 50
    plague.rollPlague.mockReturnValue({ occurred: true, deaths: 50 });
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // Post-plague: 50. Feed with 560 → feeds 28 → 22 starve → 44% ≤ 45% → no defeat
    const { turnResult } = processTurn(state, 560, 100);
    expect(turnResult.peopleDied).toBe(22);
    expect(turnResult.starvationDefeat).toBe(false);
  });

  it("should set starvationDefeat without plague when >45% starve", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // No plague. Feed with 1080 → feeds 54 → 46 starve → 46% > 45% → defeat
    const { turnResult } = processTurn(state, 1080, 100);
    expect(turnResult.peopleDied).toBe(46);
    expect(turnResult.starvationDefeat).toBe(true);
  });

  it("should not set starvationDefeat at exactly 45%", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    // No plague. Feed with 1100 → feeds 55 → 45 starve → 45% → not > 45% → no defeat
    const { turnResult } = processTurn(state, 1100, 100);
    expect(turnResult.peopleDied).toBe(45);
    expect(turnResult.starvationDefeat).toBe(false);
  });

  it("should include plague and rats info in turnResult when no events occur", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { turnResult } = processTurn(state, 2000, 100);
    expect(turnResult.plagueOccurred).toBe(false);
    expect(turnResult.plagueDeaths).toBe(0);
    expect(turnResult.ratsOccurred).toBe(false);
    expect(turnResult.grainDestroyedByRats).toBe(0);
    expect(turnResult.starvationDefeat).toBe(false);
  });
});

describe("checkGameOver", () => {
  it("should return won after turn 10 is complete", () => {
    const state = { grain: 1000, population: 100, land: 1000, turn: 11 };
    const result = checkGameOver(state);
    expect(result.gameOver).toBe(true);
    expect(result.won).toBe(true);
  });

  it("should not be game over during turns 1-10", () => {
    const state = { grain: 2800, population: 100, land: 1000, turn: 5 };
    const result = checkGameOver(state);
    expect(result.gameOver).toBe(false);
  });

  it("should detect failure when grain is insufficient to plant anything", () => {
    const state = { grain: 0, population: 100, land: 1000, turn: 5 };
    const result = checkGameOver(state);
    expect(result.gameOver).toBe(true);
    expect(result.won).toBe(false);
  });

  it("should not fail if player can still plant at least one acre", () => {
    const state = { grain: 1, population: 100, land: 1000, turn: 5 };
    const result = checkGameOver(state);
    expect(result.gameOver).toBe(false);
  });

  it("should detect failure when population is zero", () => {
    const state = { grain: 1000, population: 0, land: 1000, turn: 5 };
    const result = checkGameOver(state);
    expect(result.gameOver).toBe(true);
    expect(result.won).toBe(false);
  });
});
