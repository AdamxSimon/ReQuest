// React

import { useMemo } from "react";

// Components

import PointsButton, {
  AdjustmentActions,
} from "../../../../components/point-adjustment-button/PointAdjustmentButton";

// Utils

import { getAttributeModifier } from "../../../../utils";

// Styles

import classes from "./styles.module.css";
interface AttributeContainerProps {
  label: string;
  points: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

const AttributeContainer = (props: AttributeContainerProps): JSX.Element => {
  const { label, points, handleDecrement, handleIncrement } = props;

  const modifier: number = useMemo(() => {
    return getAttributeModifier(points);
  }, [points]);

  return (
    <div className={classes.attributesContainer}>
      <div className={classes.header}>{label}</div>
      <div className={classes.pointsContainer}>
        <PointsButton
          type={AdjustmentActions.Decrement}
          onClick={handleDecrement}
        />
        <div className={classes.points}>{points}</div>
        <PointsButton
          type={AdjustmentActions.Increment}
          onClick={handleIncrement}
        />
      </div>
      <div className={classes.modifier}>
        {modifier >= 0 ? `+${modifier}` : modifier}
      </div>
    </div>
  );
};

export default AttributeContainer;
