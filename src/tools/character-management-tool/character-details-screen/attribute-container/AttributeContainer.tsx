// React

import { useCallback, useState } from "react";

// Custom Components

import PointsButton, {
  AdjustmentActions,
} from "../../../../components/point-adjustment-button/PointAdjustmentButton";

// Utils

import { getAttributeModifier } from "../../../../utils";

// Types

import { Character } from "../../../../types/Character";

// Styles

import classes from "./styles.module.css";
interface AttributeContainerProps {
  label: string;
  initialPointsState?: number;
  updateCharacterAttributes: (key: string, value: number) => void;
  character: Character;
}

const AttributeContainer = (props: AttributeContainerProps): JSX.Element => {
  const { label, initialPointsState, updateCharacterAttributes } = props;

  const [points, setPoints] = useState<number>(initialPointsState || 8);

  const modifier: number = getAttributeModifier(points);

  const increment = useCallback(() => {
    setPoints((points) => points + 1);
    updateCharacterAttributes(label.toLowerCase(), points + 1);
  }, [label, points, updateCharacterAttributes]);

  const decrement = useCallback(() => {
    setPoints((points) => points - 1);
    updateCharacterAttributes(label.toLowerCase(), points - 1);
  }, [label, points, updateCharacterAttributes]);

  return (
    <div className={classes.attributesContainer}>
      <div className={classes.header}>{label}</div>
      <div className={classes.pointsContainer}>
        <PointsButton type={AdjustmentActions.Decrement} onClick={decrement} />
        <div className={classes.points}>{points}</div>
        <PointsButton type={AdjustmentActions.Increment} onClick={increment} />
      </div>
      <div className={classes.modifier}>
        {modifier >= 0 ? `+${modifier}` : modifier}
      </div>
    </div>
  );
};

export default AttributeContainer;
