// Assets

import PlusPNG from "../../assets/plus.png";
import MinusPNG from "../../assets/minus.png";

// Styles

import classes from "./styles.module.css";

export enum AdjustmentActions {
  Decrement,
  Increment,
}

interface PointsButtonProps {
  type: AdjustmentActions;
  onClick: () => void;
}

const PointsButton = (props: PointsButtonProps): JSX.Element => {
  const { type, onClick } = props;

  return (
    <div className={classes.pointAdjustmentButton} onClick={onClick}>
      <img
        src={type === AdjustmentActions.Increment ? PlusPNG : MinusPNG}
        alt={type === AdjustmentActions.Increment ? "Plus" : "Minus"}
        height={12}
      />
    </div>
  );
};

export default PointsButton;
