const calcPercent = (norm, drinks) => {
  let totalDrink = 0;
  for (let i = 0; i < drinks.length; i++) {
    totalDrink += drinks[i].ml;
  }
  const percent = Math.round((totalDrink / norm) * 100);
  return percent;
};

module.exports = calcPercent;
