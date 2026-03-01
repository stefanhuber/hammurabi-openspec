const elements = {
  turnNumber: () => document.getElementById("turn-number"),
  population: () => document.getElementById("population"),
  land: () => document.getElementById("land"),
  grain: () => document.getElementById("grain"),
  landPrice: () => document.getElementById("land-price"),
  buyInput: () => document.getElementById("buy-input"),
  sellInput: () => document.getElementById("sell-input"),
  foodInput: () => document.getElementById("food-input"),
  acresInput: () => document.getElementById("acres-input"),
  submitBtn: () => document.getElementById("submit-btn"),
  errorMessage: () => document.getElementById("error-message"),
  playerInput: () => document.getElementById("player-input"),
  turnResults: () => document.getElementById("turn-results"),
  landTradeResult: () => document.getElementById("land-trade-result"),
  yieldPerAcre: () => document.getElementById("yield-per-acre"),
  totalHarvest: () => document.getElementById("total-harvest"),
  peopleDied: () => document.getElementById("people-died"),
  immigrantsArrived: () => document.getElementById("immigrants-arrived"),
  nextTurnBtn: () => document.getElementById("next-turn-btn"),
  gameOver: () => document.getElementById("game-over"),
  gameOverTitle: () => document.getElementById("game-over-title"),
  gameOverMessage: () => document.getElementById("game-over-message"),
  restartBtn: () => document.getElementById("restart-btn"),
  gameState: () => document.getElementById("game-state"),
};

export function renderState(state) {
  elements.turnNumber().textContent = state.turn;
  elements.population().textContent = state.population;
  elements.land().textContent = state.land;
  elements.grain().textContent = state.grain;
}

export function showLandPrice(price) {
  elements.landPrice().textContent = price;
}

export function getBuyInput() {
  return parseInt(elements.buyInput().value, 10);
}

export function getSellInput() {
  return parseInt(elements.sellInput().value, 10);
}



export function showTurnResults(turnResult) {
  if (turnResult.acresToBuy > 0) {
    elements.landTradeResult().textContent = `You bought ${turnResult.acresToBuy} acres at ${turnResult.landPrice} bushels each.`;
  } else if (turnResult.acresToSell > 0) {
    elements.landTradeResult().textContent = `You sold ${turnResult.acresToSell} acres at ${turnResult.landPrice} bushels each.`;
  } else {
    elements.landTradeResult().textContent = "No land was traded.";
  }

  elements.yieldPerAcre().textContent = turnResult.yieldPerAcre;
  elements.totalHarvest().textContent = turnResult.totalHarvest;

  if (turnResult.peopleDied > 0) {
    elements.peopleDied().textContent = `${turnResult.peopleDied} people starved.`;
  } else {
    elements.peopleDied().textContent = "No one starved.";
  }

  if (turnResult.immigrants > 0) {
    elements.immigrantsArrived().textContent = `${turnResult.immigrants} immigrants arrived.`;
  } else {
    elements.immigrantsArrived().textContent = "";
  }

  elements.turnResults().hidden = false;
  elements.playerInput().hidden = true;
}

export function showError(message) {
  elements.errorMessage().textContent = message;
  elements.errorMessage().hidden = false;
}

export function clearError() {
  elements.errorMessage().textContent = "";
  elements.errorMessage().hidden = true;
}

export function showGameOver(won) {
  elements.gameState().hidden = true;
  elements.playerInput().hidden = true;
  elements.turnResults().hidden = true;
  elements.gameOver().hidden = false;

  if (won) {
    elements.gameOverTitle().textContent = "Victory!";
    elements.gameOverMessage().textContent =
      "Congratulations, Hammurabi! You have successfully ruled Samaria for 10 years.";
  } else {
    elements.gameOverTitle().textContent = "Defeat!";
    elements.gameOverMessage().textContent =
      "Hammurabi, you have failed to sustain the city of Samaria. Your people have no grain left.";
  }
}

export function resetUI() {
  elements.gameState().hidden = false;
  elements.playerInput().hidden = false;
  elements.turnResults().hidden = true;
  elements.gameOver().hidden = true;
  elements.buyInput().value = "0";
  elements.sellInput().value = "0";
  elements.foodInput().value = "";
  elements.acresInput().value = "";
  clearError();
}

export function showInputPhase() {
  elements.playerInput().hidden = false;
  elements.turnResults().hidden = true;
  elements.buyInput().value = "0";
  elements.sellInput().value = "0";
  elements.foodInput().value = "";
  elements.acresInput().value = "";
  clearError();
}

export function getFoodInput() {
  return parseInt(elements.foodInput().value, 10);
}

export function getAcresInput() {
  return parseInt(elements.acresInput().value, 10);
}

export function onSubmit(callback) {
  elements.submitBtn().addEventListener("click", callback);
}

export function onNextTurn(callback) {
  elements.nextTurnBtn().addEventListener("click", callback);
}

export function onRestart(callback) {
  elements.restartBtn().addEventListener("click", callback);
}
