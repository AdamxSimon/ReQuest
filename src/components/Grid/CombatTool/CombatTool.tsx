// React

import { useState, MouseEvent } from "react";

// Custom components

import GridEditor from "../GridEditor/GridEditor";
import Grid from "../Grid/Grid";

// Custom Hooks

import useLoadImages from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

const CombatTool = (): JSX.Element => {
  const { imagesLoaded, loadedImages } = useLoadImages();

  const spriteSize: number = 16;

  const [tileSize, setTileSize] = useState<number>(16);

  const [selectedSprite, setSelectedSprite] = useState<HTMLImageElement>();

  const selectSprite = (event: MouseEvent): void => {
    setSelectedSprite(loadedImages[Math.floor(event.clientX / 64)].img);
  };

  return imagesLoaded ? (
    <div className={classes.toolContainer}>
      <GridEditor
        images={loadedImages}
        spriteSize={spriteSize}
        selectSprite={selectSprite}
      />
      <Grid
        spriteSize={spriteSize}
        tileSize={tileSize}
        selectedSprite={selectedSprite}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CombatTool;
