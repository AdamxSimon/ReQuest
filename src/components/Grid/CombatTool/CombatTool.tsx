// Custom components

import Grid from "../Grid/Grid";

// Styles

import classes from "./styles.module.css";

const CombatTool = (): JSX.Element => {
  return (
    <div className={classes.toolContainer}>
      <Grid />
    </div>
  );
};

export default CombatTool;
