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

  return imagesLoaded ? (
    <div className={classes.toolContainer}>
      <GridEditor images={loadedImages} spriteSize={spriteSize} />
      <Grid images={loadedImages} spriteSize={spriteSize} tileSize={tileSize} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CombatTool;
