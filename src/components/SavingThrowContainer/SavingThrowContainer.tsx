// React

import { useEffect, useState } from "react";

// Enums

import { Character } from "../../types/Character";
import { getAttributeModifier } from "../../utils";

// Styles

import classes from "./styles.module.css";

interface SavingThrowContainerProps {
  attribute: string;
  character: Character;
  setCharacterBeingEdited: React.Dispatch<
    React.SetStateAction<Character | null>
  >;
}

const SavingThrowContainer = (
  props: SavingThrowContainerProps
): JSX.Element => {
  const { attribute, character, setCharacterBeingEdited } = props;

  const [proficient, setProficient] = useState<boolean>(
    character.savingThrows[attribute.toLowerCase()]
  );

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

  useEffect(() => {
    const characterCopy = { ...character };
    characterCopy.savingThrows[attribute.toLowerCase()] = proficient;
    setCharacterBeingEdited(characterCopy);
  }, [proficient]);

  return (
    <div
      className={classes.savingThrowContainer}
      style={style}
      onClick={() => setProficient((proficient) => !proficient)}
    >
      <div className={classes.header}>{attribute}</div>
      <div className={classes.pointsContainer}>
        <div className={classes.modifier}>
          {modifier >= 0 ? `+${modifier}` : modifier}
        </div>
      </div>
      <div className={classes.attribute}>{`(${attribute})`}</div>
    </div>
  );
};

export default SavingThrowContainer;
