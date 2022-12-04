// Assets

import PlusPNG from "../../assets/plus.png";
import MinusPNG from "../../assets/minus.png";

// Styles

import classes from "./styles.module.css";

export enum Buttons {
  Decrement,
  Increment,
}

interface PointsButtonProps {
  type: Buttons;
  onClick: () => void;
}

const PointsButton = (props: PointsButtonProps): JSX.Element => {
  const { type, onClick } = props;

  return (
    <div className={classes.pointsButton} onClick={onClick}>
      <img
        src={type === Buttons.Increment ? PlusPNG : MinusPNG}
        alt={type === Buttons.Increment ? "Plus" : "Minus"}
        height={12}
      />
    </div>
  );
};

export default PointsButton;
