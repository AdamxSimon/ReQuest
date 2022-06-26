// Custom components

import GridEditor from "../GridEditor/GridEditor";
import Grid from "../Grid/Grid";

// Custom Hooks

import useLoadImages from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

const CombatTool = (): JSX.Element => {
  const { imagesLoaded, loadedImages } = useLoadImages();

  return imagesLoaded ? (
    <div className={classes.toolContainer}>
      <GridEditor images={loadedImages} />
      <Grid images={loadedImages} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CombatTool;
