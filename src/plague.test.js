import { describe, it, expect } from "vitest";
import { rollPlague } from "./plague.js";

describe("rollPlague", () => {
  it("should trigger plague when random < 0.15", () => {
    const result = rollPlague(100, 0.14);
    expect(result.occurred).toBe(true);
  });

  it("should not trigger plague when random >= 0.15", () => {
    const result = rollPlague(100, 0.15);
    expect(result.occurred).toBe(false);
  });

  it("should not trigger plague when random is well above threshold", () => {
    const result = rollPlague(100, 0.5);
    expect(result.occurred).toBe(false);
    expect(result.deaths).toBe(0);
  });

  it("should trigger plague at random = 0", () => {
    const result = rollPlague(100, 0);
    expect(result.occurred).toBe(true);
  });

  it("should kill half the population (even)", () => {
    const result = rollPlague(100, 0.1);
    expect(result.deaths).toBe(50);
  });

  it("should kill floor(population/2) for odd population", () => {
    const result = rollPlague(51, 0.1);
    expect(result.deaths).toBe(25);
  });

  it("should return zero deaths when no plague occurs", () => {
    const result = rollPlague(100, 0.2);
    expect(result.deaths).toBe(0);
  });
});
