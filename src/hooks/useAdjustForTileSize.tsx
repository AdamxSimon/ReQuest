// React

import { useContext } from "react";

// Context

import { CombatToolContext } from "../context/CombatToolContext";

export const useAdjustForTileSize = (amount: number) => {
  const { grid } = useContext(CombatToolContext);
  return amount * grid.tileSize;
};
