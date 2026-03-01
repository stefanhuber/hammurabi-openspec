import { describe, it, expect } from "vitest";
import { calculateStarvation, calculateImmigration } from "./population.js";

describe("calculateStarvation", () => {
  it("should feed everyone when grain is exactly enough", () => {
    const result = calculateStarvation(100, 2000);
    expect(result.peopleFed).toBe(100);
    expect(result.peopleDied).toBe(0);
    expect(result.survivingPopulation).toBe(100);
  });

  it("should feed everyone when grain exceeds need", () => {
    const result = calculateStarvation(100, 3000);
    expect(result.peopleFed).toBe(100);
    expect(result.peopleDied).toBe(0);
    expect(result.survivingPopulation).toBe(100);
  });

  it("should starve 1 person when 1 bushel short", () => {
    const result = calculateStarvation(100, 1999);
    expect(result.peopleFed).toBe(99);
    expect(result.peopleDied).toBe(1);
    expect(result.survivingPopulation).toBe(99);
  });

  it("should starve everyone when zero grain allocated", () => {
    const result = calculateStarvation(100, 0);
    expect(result.peopleFed).toBe(0);
    expect(result.peopleDied).toBe(100);
    expect(result.survivingPopulation).toBe(0);
  });

  it("should calculate partial feeding correctly", () => {
    const result = calculateStarvation(100, 500);
    expect(result.peopleFed).toBe(25);
    expect(result.peopleDied).toBe(75);
    expect(result.survivingPopulation).toBe(25);
  });
});

describe("calculateImmigration", () => {
  it("should calculate immigration with standard values", () => {
    // floor((20 * 1000 + 550) / (100 * 100)) = floor(20550 / 10000) = 2
    const result = calculateImmigration(1000, 550, 100);
    expect(result).toBe(2);
  });

  it("should calculate more immigrants with smaller population", () => {
    // floor((20 * 1000 + 800) / (100 * 50)) = floor(20800 / 5000) = 4
    const result = calculateImmigration(1000, 800, 50);
    expect(result).toBe(4);
  });

  it("should calculate more immigrants with more land", () => {
    // floor((20 * 2000 + 500) / (100 * 100)) = floor(40500 / 10000) = 4
    const result = calculateImmigration(2000, 500, 100);
    expect(result).toBe(4);
  });

  it("should calculate more immigrants with more grain", () => {
    // floor((20 * 1000 + 5000) / (100 * 100)) = floor(25000 / 10000) = 2
    const result = calculateImmigration(1000, 5000, 100);
    expect(result).toBe(2);
  });

  it("should return zero when no land and no grain", () => {
    // floor((20 * 0 + 0) / (100 * 100)) = 0
    const result = calculateImmigration(0, 0, 100);
    expect(result).toBe(0);
  });
});
