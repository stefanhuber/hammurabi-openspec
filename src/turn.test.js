import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateFoodAllocation,
  validateAcresToPlant,
  processTurn,
  checkGameOver,
} from "./turn.js";
import * as harvest from "./harvest.js";

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
