// React

import { useCallback, useState } from "react";

// Enums

import { Character } from "../../../../types/Character";
import { getAttributeModifier } from "../../../../utils";

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
    color: proficient ? "white" : "black",
  };

  const toggle = useCallback(() => {
    const characterCopy = { ...character };
    characterCopy.savingThrows[attribute.toLowerCase()] = !proficient;
    setCharacterBeingEdited(characterCopy);
    setProficient(!proficient);
  }, [attribute, character, proficient, setCharacterBeingEdited]);

  return (
    <div
      className={classes.savingThrowContainer}
      style={style}
      onClick={toggle}
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
