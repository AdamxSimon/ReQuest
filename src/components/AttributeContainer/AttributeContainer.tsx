// React

import { useState } from "react";

// Custom Components

import PointsButton, { Buttons } from "../PointsButton/PointsButton";

// Styles

import classes from "./styles.module.css";

interface AttributeContainerProps {
  label: string;
}

const AttributeContainer = (props: AttributeContainerProps): JSX.Element => {
  const [points, setPoints] = useState<number>(0);

  const { label } = props;

  const modifier: number = Math.floor((points - 10) / 2);

  return (
    <div className={classes.attributesContainer}>
      <div className={classes.header}>{label}</div>
      <div className={classes.pointsContainer}>
        <PointsButton
          type={Buttons.Decrement}
          onClick={() => setPoints((points) => points - 1)}
        />
        <div className={classes.points}>{points}</div>
        <PointsButton
          type={Buttons.Increment}
          onClick={() => setPoints((points) => points + 1)}
        />
      </div>
      <div className={classes.modifier}>
        {modifier >= 0 ? `+${modifier}` : modifier}
      </div>
    </div>
  );
};

export default AttributeContainer;
