export const getAttributeModifier = (points: number): number => {
  return Math.floor((points - 10) / 2);
};

export const roll = (die: number): number => {
  return Math.floor(Math.random() * die + 1);
};
