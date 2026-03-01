import { describe, it, expect } from "vitest";
import {
  generateLandPrice,
  validateLandTrade,
  executeLandTrade,
} from "./land-market.js";

describe("generateLandPrice", () => {
  it("should return a value between 17 and 26", () => {
    for (let i = 0; i < 100; i++) {
      const price = generateLandPrice();
      expect(price).toBeGreaterThanOrEqual(17);
      expect(price).toBeLessThanOrEqual(26);
    }
  });

  it("should only return integer values", () => {
    for (let i = 0; i < 100; i++) {
      const price = generateLandPrice();
      expect(Number.isInteger(price)).toBe(true);
    }
  });

  it("should return all possible values over many runs", () => {
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(generateLandPrice());
    }
    expect(results).toEqual(new Set([17, 18, 19, 20, 21, 22, 23, 24, 25, 26]));
  });
});

describe("validateLandTrade", () => {
  const defaultState = { grain: 2800, population: 100, land: 1000, turn: 1 };
  const price = 20;

  it("should accept buying within budget", () => {
    const result = validateLandTrade(50, 0, price, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should accept selling within land owned", () => {
    const result = validateLandTrade(0, 100, price, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should accept no trade", () => {
    const result = validateLandTrade(0, 0, price, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should reject buying more than affordable", () => {
    // 2800 / 20 = 140 max
    const result = validateLandTrade(141, 0, price, defaultState);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("grain");
  });

  it("should allow buying exactly affordable amount", () => {
    const result = validateLandTrade(140, 0, price, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should reject selling more than owned", () => {
    const result = validateLandTrade(0, 1001, price, defaultState);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("sell");
  });

  it("should allow selling exactly all land", () => {
    const result = validateLandTrade(0, 1000, price, defaultState);
    expect(result.valid).toBe(true);
  });

  it("should reject negative buy values", () => {
    const result = validateLandTrade(-1, 0, price, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should reject negative sell values", () => {
    const result = validateLandTrade(0, -1, price, defaultState);
    expect(result.valid).toBe(false);
  });

  it("should allow buying with proceeds from selling", () => {
    // Sell 100 acres → +2000 grain → total 4800 → can buy 240 acres
    const result = validateLandTrade(240, 100, price, defaultState);
    expect(result.valid).toBe(true);
  });
});

describe("executeLandTrade", () => {
  const defaultState = { grain: 2800, population: 100, land: 1000, turn: 1 };

  it("should deduct grain and add land when buying", () => {
    const result = executeLandTrade(defaultState, 50, 0, 20);
    expect(result.grain).toBe(1800);
    expect(result.land).toBe(1050);
  });

  it("should add grain and remove land when selling", () => {
    const result = executeLandTrade(defaultState, 0, 100, 22);
    expect(result.grain).toBe(5000);
    expect(result.land).toBe(900);
  });

  it("should handle no trade", () => {
    const result = executeLandTrade(defaultState, 0, 0, 20);
    expect(result.grain).toBe(2800);
    expect(result.land).toBe(1000);
  });

  it("should handle buy and sell in same turn", () => {
    // Sell 200 → +4000, Buy 100 → -2000, net: +2000 grain, -100 land
    const result = executeLandTrade(defaultState, 100, 200, 20);
    expect(result.grain).toBe(4800);
    expect(result.land).toBe(900);
  });

  it("should not mutate original state", () => {
    executeLandTrade(defaultState, 50, 0, 20);
    expect(defaultState.grain).toBe(2800);
    expect(defaultState.land).toBe(1000);
  });
});
