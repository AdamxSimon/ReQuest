// React

import { useContext, useEffect, useMemo } from "react";

// Context

import { CombatToolContext } from "../../context/CombatToolContext";

// Components

import Tile, { TileProps } from "../Tile/Tile";

// Hooks

import { useAdjustForTileSize } from "../../hooks/useAdjustForTileSize";

// Utils

import { generateTileMap } from "../../utils";

// Types

import { StylesObject } from "../../types/StylesObject";

// Styles

import classes from "./styles.module.css";

const Grid = (): JSX.Element => {
  const { grid, setGrid } = useContext(CombatToolContext);

  const styles: StylesObject = {
    grid: {
      height: useAdjustForTileSize(grid.height),
      minWidth: useAdjustForTileSize(grid.width),
      maxWidth: useAdjustForTileSize(grid.width),
      justifyContent: "center",
      alignItems: "center",
    },
  };

  useEffect(() => {
    const initialTileMap: TileProps[] = generateTileMap(
      grid.height,
      grid.width
    );
    setGrid({ ...grid, tiles: initialTileMap });
  }, []);

  const updateGridSize = useMemo(() => {
    setGrid({ ...grid, tiles: generateTileMap(grid.height, grid.width) });
  }, [grid.height, grid.width]);

  return (
    <div className={classes.gridContainer}>
      <div className={classes.grid} style={styles.grid}>
        {grid.tiles.map((tile) => {
          return (
            <Tile
              key={`${tile.position}`}
              position={tile.position}
              groundObject={tile.groundObject}
              obstructionObject={tile.obstructionObject}
              characterObject={tile.characterObject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
