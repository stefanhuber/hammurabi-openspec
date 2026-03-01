import { createInitialState } from "./game-state.js";
import {
  validateFoodAllocation,
  validateAcresToPlant,
  processTurn,
  checkGameOver,
} from "./turn.js";
import {
  renderState,
  showTurnResults,
  showError,
  clearError,
  showGameOver,
  resetUI,
  showInputPhase,
  getFoodInput,
  getAcresInput,
  onSubmit,
  onNextTurn,
  onRestart,
} from "./ui.js";

let state;

function startGame() {
  state = createInitialState();
  resetUI();
  renderState(state);
}

function handleSubmit() {
  const grainForFood = getFoodInput();
  const acresToPlant = getAcresInput();

  if (isNaN(grainForFood)) {
    showError("Please enter a number for food allocation.");
    return;
  }

  if (isNaN(acresToPlant)) {
    showError("Please enter a number for acres to plant.");
    return;
  }

  const foodValidation = validateFoodAllocation(grainForFood, state);
  if (!foodValidation.valid) {
    showError(foodValidation.error);
    return;
  }

  const grainAfterFood = state.grain - grainForFood;
  const stateForPlanting = { ...state, grain: grainAfterFood };
  const acresValidation = validateAcresToPlant(acresToPlant, stateForPlanting);
  if (!acresValidation.valid) {
    showError(acresValidation.error);
    return;
  }

  clearError();
  const { newState, turnResult } = processTurn(state, grainForFood, acresToPlant);
  state = newState;
  renderState(state);
  showTurnResults(turnResult);
}

function handleNextTurn() {
  const result = checkGameOver(state);
  if (result.gameOver) {
    showGameOver(result.won);
  } else {
    showInputPhase();
  }
}

onSubmit(handleSubmit);
onNextTurn(handleNextTurn);
onRestart(startGame);

startGame();
