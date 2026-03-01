import { describe, it, expect } from "vitest";
import { calculateYield } from "./harvest.js";

describe("calculateYield", () => {
  it("should return a value between 2 and 6", () => {
    for (let i = 0; i < 100; i++) {
      const result = calculateYield();
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  it("should only return integer values", () => {
    for (let i = 0; i < 100; i++) {
      const result = calculateYield();
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it("should return all possible values over many runs", () => {
    const results = new Set();
    for (let i = 0; i < 1000; i++) {
      results.add(calculateYield());
    }
    expect(results).toEqual(new Set([2, 3, 4, 5, 6]));
  });
});
