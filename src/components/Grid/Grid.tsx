import classes from "./styles.module.css";

const Grid = () => {
  return (
    <div className={classes.gridContainer}>
      <canvas className={classes.grid}></canvas>
    </div>
  );
};

export default Grid;
