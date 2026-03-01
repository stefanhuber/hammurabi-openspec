import { describe, it, expect } from "vitest";
import { rollRats } from "./rats.js";

describe("rollRats", () => {
  it("should trigger rats when random < 0.40", () => {
    const result = rollRats(500, 0.39, 0.5);
    expect(result.occurred).toBe(true);
  });

  it("should not trigger rats when random >= 0.40", () => {
    const result = rollRats(500, 0.40, 0.5);
    expect(result.occurred).toBe(false);
  });

  it("should not trigger rats when random is well above threshold", () => {
    const result = rollRats(500, 0.8, 0.5);
    expect(result.occurred).toBe(false);
    expect(result.grainDestroyed).toBe(0);
  });

  it("should trigger rats at random = 0", () => {
    const result = rollRats(500, 0, 0.5);
    expect(result.occurred).toBe(true);
  });

  it("should destroy 10% at minimum destruction (destructionRandom = 0)", () => {
    const result = rollRats(500, 0.1, 0);
    expect(result.grainDestroyed).toBe(50); // floor(500 * 0.10)
  });

  it("should destroy 30% at maximum destruction (destructionRandom = 1)", () => {
    const result = rollRats(500, 0.1, 1);
    expect(result.grainDestroyed).toBe(150); // floor(500 * 0.30)
  });

  it("should destroy 20% at mid-range destruction (destructionRandom = 0.5)", () => {
    const result = rollRats(300, 0.1, 0.5);
    expect(result.grainDestroyed).toBe(60); // floor(300 * 0.20)
  });

  it("should floor the destroyed amount", () => {
    const result = rollRats(333, 0.1, 0);
    expect(result.grainDestroyed).toBe(33); // floor(333 * 0.10)
  });

  it("should return zero grain destroyed when no rats occur", () => {
    const result = rollRats(500, 0.5, 0.5);
    expect(result.grainDestroyed).toBe(0);
  });
});
