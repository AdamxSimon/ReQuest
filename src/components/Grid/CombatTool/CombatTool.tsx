// React

import { useState } from "react";

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

  const [inEraseMode, setInEraseMode] = useState<boolean>(false);
  const [selectedSprite, setSelectedSprite] = useState<HTMLImageElement>();

  const toggleEraseMode = (): void => {
    setInEraseMode(!inEraseMode);
  };

  const selectSprite = (event: any): void => {
    if (inEraseMode) setInEraseMode(false);
    setSelectedSprite(loadedImages[Math.floor(event.clientX / 64)].img);
  };

  console.log(inEraseMode);

  return imagesLoaded ? (
    <div className={classes.toolContainer}>
      <GridEditor
        images={loadedImages}
        spriteSize={spriteSize}
        selectSprite={selectSprite}
        inEraseMode={inEraseMode}
        toggleEraseMode={toggleEraseMode}
      />
      <Grid
        spriteSize={spriteSize}
        tileSize={tileSize}
        selectedSprite={selectedSprite}
        inEraseMode={inEraseMode}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CombatTool;
