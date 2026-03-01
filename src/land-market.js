export function generateLandPrice() {
  return 17 + Math.floor(Math.random() * 10);
}

export function validateLandTrade(acresToBuy, acresToSell, price, state) {
  if (!Number.isInteger(acresToBuy) || acresToBuy < 0) {
    return { valid: false, error: "Acres to buy must be a non-negative integer." };
  }

  if (!Number.isInteger(acresToSell) || acresToSell < 0) {
    return { valid: false, error: "Acres to sell must be a non-negative integer." };
  }

  if (acresToSell > state.land) {
    return {
      valid: false,
      error: `Cannot sell more than you own. You have ${state.land} acres.`,
    };
  }

  const buyCost = acresToBuy * price;
  const sellRevenue = acresToSell * price;
  const grainAfterTrade = state.grain + sellRevenue - buyCost;

  if (grainAfterTrade < 0) {
    const maxAffordable = Math.floor((state.grain + sellRevenue) / price);
    return {
      valid: false,
      error: `Not enough grain to buy ${acresToBuy} acres. You can afford at most ${maxAffordable} acres.`,
    };
  }

  return { valid: true };
}

export function executeLandTrade(state, acresToBuy, acresToSell, price) {
  const buyCost = acresToBuy * price;
  const sellRevenue = acresToSell * price;

  return {
    ...state,
    grain: state.grain + sellRevenue - buyCost,
    land: state.land + acresToBuy - acresToSell,
  };
}
