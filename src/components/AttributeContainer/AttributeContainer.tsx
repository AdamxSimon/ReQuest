// Styles

import classes from "./styles.module.css";

const AttributeContainer = () => {
  return (
    <div className={classes.attributesContainer}>
      <div className={classes.header}>Strength</div>
      <div className={classes.points}>21</div>
      <div className={classes.modifier}>+2</div>
    </div>
  );
};

export default AttributeContainer;
