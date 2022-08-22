import { TileProps } from "./components/Tile/Tile";

export const getAttributeModifier = (points: number): number => {
  return Math.floor((points - 10) / 2);
};

export const generateTileMap = (height: number, width: number): TileProps[] => {
  const tileMap: TileProps[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tileMap.push({
        position: [x, y],
        groundObject: undefined,
        obstructionObject: undefined,
        characterObject: undefined,
      });
    }
  }

  return tileMap;
};
