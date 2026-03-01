import { describe, it, expect } from "vitest";
import { createInitialState } from "./game-state.js";

describe("createInitialState", () => {
  it("should set grain to 2800", () => {
    const state = createInitialState();
    expect(state.grain).toBe(2800);
  });

  it("should set population to 100", () => {
    const state = createInitialState();
    expect(state.population).toBe(100);
  });

  it("should set land to 1000", () => {
    const state = createInitialState();
    expect(state.land).toBe(1000);
  });

  it("should set turn to 1", () => {
    const state = createInitialState();
    expect(state.turn).toBe(1);
  });
});
