// Styles

import classes from "./styles.module.css";

export enum Buttons {
  Decrement = "<",
  Increment = ">",
}

interface PointsButtonProps {
  type: Buttons;
  onClick: () => void;
}

const PointsButton = (props: PointsButtonProps): JSX.Element => {
  const { type, onClick } = props;

  return (
    <div className={classes.pointsButton} onClick={onClick}>
      {type}
    </div>
  );
};

export default PointsButton;
