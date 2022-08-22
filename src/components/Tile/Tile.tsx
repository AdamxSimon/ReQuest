// React

import { useContext } from "react";

// Context

import { CombatToolContext } from "../../context/CombatToolContext";

// Types

import { GameObject, GameObjectTypes } from "../../context/GameObjectContext";
import { StylesObject } from "../../types/StylesObject";

export interface TileProps {
  position: [x: number, y: number];
  groundObject?: GameObject;
  obstructionObject?: GameObject;
  characterObject?: GameObject;
}

const Tile = (props: TileProps) => {
  const { position, groundObject, obstructionObject, characterObject } = props;

  const { grid, setGrid, selectedObject } = useContext(CombatToolContext);

  const [x, y] = position;
  const isAlternating: boolean = x % 2 === 0 ? !!(y % 2) : !(y % 2);

  const drawImage = () => {
    const tilesCopy = [...grid.tiles];
    for (let tile of tilesCopy) {
      if (
        tile.position[0] === position[0] &&
        tile.position[1] === position[1]
      ) {
        switch (selectedObject?.type) {
          case GameObjectTypes.Ground:
            tile.groundObject = selectedObject;
            break;
          case GameObjectTypes.Obstruction:
            tile.obstructionObject = selectedObject;
            break;
          case GameObjectTypes.Character:
            tile.characterObject = selectedObject;
            break;
        }
      }
    }
    setGrid({ ...grid, tiles: tilesCopy });
  };

  const styles: StylesObject = {
    tile: {
      height: grid.tileSize,
      width: grid.tileSize,
      position: "relative",
      cursor: "pointer",
      backgroundColor: isAlternating ? "lightgray" : "white",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      imageRendering: "pixelated",
      transition: "all 1s",
    },
  };

  return (
    <div style={styles.tile} onClick={drawImage}>
      {groundObject && (
        <img
          style={styles.image}
          src={groundObject?.image}
          alt={groundObject?.image}
          height={grid.tileSize}
          width={grid.tileSize}
        />
      )}
      {obstructionObject && (
        <img
          style={styles.image}
          src={obstructionObject?.image}
          alt={obstructionObject?.image}
          height={grid.tileSize}
          width={grid.tileSize}
        />
      )}
      {characterObject && (
        <img
          style={styles.image}
          src={characterObject?.image}
          alt={characterObject?.image}
          height={grid.tileSize}
          width={grid.tileSize}
        />
      )}
    </div>
  );
};

export default Tile;
