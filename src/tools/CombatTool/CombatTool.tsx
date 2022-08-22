// Components

import GridEditor from "../../components/GridEditor/GridEditor";
import Grid from "../../components/Grid/Grid";

// Styles

import classes from "./styles.module.css";

const CombatTool = (): JSX.Element => {
  return (
    <div className={classes.toolContainer}>
      <GridEditor />
      <Grid />
    </div>
  );
};

export default CombatTool;
