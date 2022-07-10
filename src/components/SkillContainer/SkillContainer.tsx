// React

import { useState } from "react";

// Styles

import classes from "./styles.module.css";

interface SkillContainerProps {
  skill: string;
  attribute: string;
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const [proficient, setProficient] = useState<boolean>(false);

  const { skill, attribute } = props;

  const proficiencyBonus = 2;

  const modifier = proficient ? proficiencyBonus : 0;

  const style = {
    backgroundColor: proficient ? "black" : "white",
    border: proficient ? "2px solid white" : "2px solid black",
    boxShadow: proficient ? "2px 2px 4px 0 gray" : "0 0 black",
    color: proficient ? "white" : "black",
    transform: proficient ? "translate(-2px, -2px)" : "translate(0, 0)",
  };

  return (
    <div
      className={classes.skillContainer}
      style={style}
      onClick={() => setProficient((proficient) => !proficient)}
    >
      <div className={classes.header}>{skill}</div>
      <div className={classes.pointsContainer}>
        <div className={classes.modifier}>{modifier}</div>
      </div>
      <div className={classes.attribute}>{`(${attribute})`}</div>
    </div>
  );
};

export default SkillContainer;
