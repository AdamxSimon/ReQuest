// React

import { useCallback, useState } from "react";

// Utils

import { getAttributeModifier, roll } from "../../../../utils";

// Enums

import { Character, Skills } from "../../../../types/Character";

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
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const modifier: number = proficient
    ? character.proficiencyBonus +
      getAttributeModifier(character.attributes[attribute.toLowerCase()])
    : getAttributeModifier(character.attributes[attribute.toLowerCase()]);

  const style = {
    backgroundColor: proficient ? "black" : "white",
    color: proficient ? "white" : "black",
  };

  const toggle = useCallback(() => {
    updateCharacterSkills(skill, !proficient);
    setProficient(!proficient);
  }, [proficient, skill, updateCharacterSkills]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const check: number = roll(20);
      const message: string = `${check} ${modifier >= 0 ? "+" : "-"} ${Math.abs(
        modifier
      )} = ${check + modifier}`;
      alert(message);
    },
    [modifier]
  );

  return (
    <div className={classes.skillContainer} style={style} onClick={toggle}>
      <div
        className={classes.header}
        onClick={handleClick}
        style={{ textDecoration: isHovering ? "underline" : "none" }}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {skill}
      </div>
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
