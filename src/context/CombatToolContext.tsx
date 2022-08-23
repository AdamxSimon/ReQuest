// React

import { createContext, useEffect, useState } from "react";

// Types

import { TileProps } from "../components/Tile/Tile";
import { generateTileMap } from "../utils";
import { GameObject } from "./GameObjectContext";

enum CombatModes {
  Draw,
  Erase,
}

interface Grid {
  height: number;
  width: number;
  tiles: TileProps[];
  tileSize: number;
  placedCharacters: GameObject[];
}

interface CombatToolContextState {
  grid: Grid;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
  mode: CombatModes;
  setMode: React.Dispatch<React.SetStateAction<CombatModes>>;
  selectedObject: GameObject | undefined;
  setSelectedObject: React.Dispatch<
    React.SetStateAction<GameObject | undefined>
  >;
}

export const CombatToolContext = createContext<CombatToolContextState>(
  {} as CombatToolContextState
);

interface CombatToolProviderProps {
  children: JSX.Element;
}

export const CombatToolProvider = ({
  children,
}: CombatToolProviderProps): JSX.Element => {
  const [grid, setGrid] = useState<Grid>({
    height: 1,
    width: 1,
    tiles: [{ position: [0, 0] }],
    tileSize: 64,
    placedCharacters: [],
  });
  const [mode, setMode] = useState<CombatModes>(CombatModes.Draw);
  const [selectedObject, setSelectedObject] = useState<
    GameObject | undefined
  >();

  useEffect(() => {
    setGrid({ ...grid, tiles: generateTileMap(grid.height, grid.width) });
  }, [grid.height, grid.width]);

  const value: CombatToolContextState = {
    grid,
    setGrid,
    mode,
    setMode,
    selectedObject,
    setSelectedObject,
  };

  return (
    <CombatToolContext.Provider value={value}>
      {children}
    </CombatToolContext.Provider>
  );
};
