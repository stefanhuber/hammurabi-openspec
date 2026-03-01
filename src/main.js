import { createInitialState } from "./game-state.js";
import {
  validateFoodAllocation,
  validateAcresToPlant,
  processTurn,
  checkGameOver,
} from "./turn.js";
import {
  generateLandPrice,
  validateLandTrade,
  executeLandTrade,
} from "./land-market.js";
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
  showLandPrice,
  getBuyInput,
  getSellInput,
} from "./ui.js";

let state;
let currentLandPrice;

function startGame() {
  state = createInitialState();
  currentLandPrice = generateLandPrice();
  resetUI();
  renderState(state);
  showLandPrice(currentLandPrice);
}

function handleSubmit() {
  const acresToBuy = getBuyInput();
  const acresToSell = getSellInput();
  const grainForFood = getFoodInput();
  const acresToPlant = getAcresInput();

  if (isNaN(acresToBuy)) {
    showError("Please enter a number for acres to buy.");
    return;
  }

  if (isNaN(acresToSell)) {
    showError("Please enter a number for acres to sell.");
    return;
  }

  const tradeValidation = validateLandTrade(
    acresToBuy,
    acresToSell,
    currentLandPrice,
    state,
  );
  if (!tradeValidation.valid) {
    showError(tradeValidation.error);
    return;
  }

  const tradedState = executeLandTrade(
    state,
    acresToBuy,
    acresToSell,
    currentLandPrice,
  );

  if (isNaN(grainForFood)) {
    showError("Please enter a number for food allocation.");
    return;
  }

  if (isNaN(acresToPlant)) {
    showError("Please enter a number for acres to plant.");
    return;
  }

  const foodValidation = validateFoodAllocation(grainForFood, tradedState);
  if (!foodValidation.valid) {
    showError(foodValidation.error);
    return;
  }

  const grainAfterFood = tradedState.grain - grainForFood;
  const stateForPlanting = { ...tradedState, grain: grainAfterFood };
  const acresValidation = validateAcresToPlant(acresToPlant, stateForPlanting);
  if (!acresValidation.valid) {
    showError(acresValidation.error);
    return;
  }

  clearError();

  state = tradedState;

  const landTradeInfo = {
    acresToBuy,
    acresToSell,
    landPrice: currentLandPrice,
    tradeCost: (acresToBuy - acresToSell) * currentLandPrice,
  };

  const { newState, turnResult } = processTurn(
    state,
    grainForFood,
    acresToPlant,
    landTradeInfo,
  );
  state = newState;
  renderState(state);
  showTurnResults(turnResult);
}

function handleNextTurn() {
  const result = checkGameOver(state);
  if (result.gameOver) {
    showGameOver(result.won);
  } else {
    currentLandPrice = generateLandPrice();
    showInputPhase();
    showLandPrice(currentLandPrice);
    renderState(state);
  }
}

onSubmit(handleSubmit);
onNextTurn(handleNextTurn);
onRestart(startGame);

startGame();
