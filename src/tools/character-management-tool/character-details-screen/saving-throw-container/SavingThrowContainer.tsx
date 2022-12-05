// React

import { useCallback, useState } from "react";

// Utils

import { getAttributeModifier, roll } from "../../../../utils";

// Enums

import { Character } from "../../../../types/Character";

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

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const modifier: number = proficient
    ? character.proficiencyBonus +
      getAttributeModifier(character.attributes[attribute.toLowerCase()])
    : getAttributeModifier(character.attributes[attribute.toLowerCase()]);

  const style = {
    backgroundColor: proficient ? "lightgreen" : "lavender",
  };

  const toggle = useCallback(() => {
    const characterCopy = { ...character };
    characterCopy.savingThrows[attribute.toLowerCase()] = !proficient;
    setCharacterBeingEdited(characterCopy);
    setProficient(!proficient);
  }, [attribute, character, proficient, setCharacterBeingEdited]);

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
    <div
      className={classes.savingThrowContainer}
      style={style}
      onClick={toggle}
    >
      <div
        className={classes.header}
        onClick={handleClick}
        style={{ textDecoration: isHovering ? "underline" : "none" }}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {attribute}
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

export default SavingThrowContainer;
