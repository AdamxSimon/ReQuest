// Styles

import classes from "./styles.module.css";

const Grid = (): JSX.Element => {
  return (
    <div className={classes.gridContainer}>
      <canvas className={classes.grid}></canvas>
    </div>
  );
};

export default Grid;
