import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateAcresToPlant, processTurn, checkGameOver } from "./turn.js";
import * as harvest from "./harvest.js";

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

  it("should deduct seed cost from grain", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(2);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState, turnResult } = processTurn(state, 100);
    expect(turnResult.seedCost).toBe(50);
    expect(newState.grain).toBe(2800 - 50 + 100 * 2);
  });

  it("should add harvest to grain stock", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(4);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState, turnResult } = processTurn(state, 200);
    expect(turnResult.totalHarvest).toBe(800);
    expect(newState.grain).toBe(2800 - 100 + 800);
  });

  it("should advance turn number by 1", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { newState } = processTurn(state, 100);
    expect(newState.turn).toBe(2);
  });

  it("should not mutate the original state", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(3);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    processTurn(state, 100);
    expect(state.grain).toBe(2800);
    expect(state.turn).toBe(1);
  });

  it("should return correct turn result details", () => {
    vi.spyOn(harvest, "calculateYield").mockReturnValue(5);
    const state = { grain: 2800, population: 100, land: 1000, turn: 1 };
    const { turnResult } = processTurn(state, 300);
    expect(turnResult.acresToPlant).toBe(300);
    expect(turnResult.seedCost).toBe(150);
    expect(turnResult.yieldPerAcre).toBe(5);
    expect(turnResult.totalHarvest).toBe(1500);
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
});
