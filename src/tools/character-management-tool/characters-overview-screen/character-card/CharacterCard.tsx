// Interfaces

import { Character } from "../../../../types/Character";

// Styles

import classes from "./styles.module.css";
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { onClick } = props;

  return <div className={classes.characterCard} onClick={onClick}></div>;
};

export default CharacterCard;
