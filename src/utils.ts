export const getAttributeModifier = (points: number): number => {
  return Math.floor((points - 10) / 2);
};

export const roll = (die: number): number => {
  return Math.floor(Math.random() * die + 1);
};

export const convertKeyToLabel = (key: string): string => {
  const characterMap: string[] = key.split("").map((letter, index) => {
    if (index === 0) return letter.toUpperCase();
    if (letter === letter.toUpperCase()) return " " + letter;
    return letter;
  });

  return characterMap.join("");
};
