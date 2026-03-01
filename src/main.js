import { createInitialState } from "./game-state.js";
import { validateAcresToPlant, processTurn, checkGameOver } from "./turn.js";
import {
  renderState,
  showTurnResults,
  showError,
  clearError,
  showGameOver,
  resetUI,
  showInputPhase,
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
  const acresToPlant = getAcresInput();

  if (isNaN(acresToPlant)) {
    showError("Please enter a number.");
    return;
  }

  const validation = validateAcresToPlant(acresToPlant, state);
  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  clearError();
  const { newState, turnResult } = processTurn(state, acresToPlant);
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
