// React

import { useEffect, useState } from "react";

// Enums

import { Skills } from "../../types/Character";

// Styles

import classes from "./styles.module.css";

interface SkillContainerProps {
  skill: Skills;
  attribute: string;
  initialProficientState: boolean;
  updateCharacterSkills: (skill: Skills, proficient: boolean) => void;
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const { skill, attribute, initialProficientState, updateCharacterSkills } =
    props;

  const [proficient, setProficient] = useState<boolean>(initialProficientState);

  const proficiencyBonus: number = 2;

  const modifier: number = proficient ? proficiencyBonus : 0;

  const style = {
    backgroundColor: proficient ? "black" : "white",
    border: proficient ? "2px solid white" : "2px solid black",
    boxShadow: proficient ? "2px 2px 4px 0 gray" : "0 0 black",
    color: proficient ? "white" : "black",
    transform: proficient ? "translate(-2px, -2px)" : "translate(0, 0)",
  };

  useEffect(() => {
    updateCharacterSkills(skill, proficient);
  }, [proficient]);

  return (
    <div
      className={classes.skillContainer}
      style={style}
      onClick={() => setProficient((proficient) => !proficient)}
    >
      <div className={classes.header}>{skill}</div>
      <div className={classes.pointsContainer}>
        <div className={classes.modifier}>
          {modifier >= 0 ? `+${modifier}` : modifier}
        </div>
      </div>
      <div className={classes.attribute}>{`(${attribute})`}</div>
    </div>
  );
};

export default SkillContainer;
