// React

import { useCallback, useState } from "react";

// Enums

import { Character, Skills } from "../../../../types/Character";
import { getAttributeModifier } from "../../../../utils";

// Styles

import classes from "./styles.module.css";

interface SkillContainerProps {
  skill: Skills;
  attribute: string;
  initialProficientState: boolean;
  updateCharacterSkills: (skill: Skills, proficient: boolean) => void;
  character: Character;
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
  const {
    skill,
    attribute,
    initialProficientState,
    updateCharacterSkills,
    character,
  } = props;

  const [proficient, setProficient] = useState<boolean>(initialProficientState);

  const modifier: number = proficient
    ? character.proficiencyBonus +
      getAttributeModifier(character.attributes[attribute.toLowerCase()])
    : getAttributeModifier(character.attributes[attribute.toLowerCase()]);

  const style = {
    backgroundColor: proficient ? "black" : "white",
    border: proficient ? "2px solid white" : "2px solid black",
    boxShadow: proficient ? "2px 2px 4px 0 gray" : "0 0 black",
    color: proficient ? "white" : "black",
    transform: proficient ? "translate(-2px, -2px)" : "translate(0, 0)",
  };

  const toggle = useCallback(() => {
    updateCharacterSkills(skill, !proficient);
    setProficient(!proficient);
  }, [proficient, skill, updateCharacterSkills]);

  return (
    <div className={classes.skillContainer} style={style} onClick={toggle}>
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
