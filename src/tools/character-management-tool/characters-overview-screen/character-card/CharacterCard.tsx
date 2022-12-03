// Types

import { Character } from "../../../../types/Character";

// Styles

import classes from "./styles.module.css";
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { character, onClick } = props;

  return (
    <div className={classes.characterCard} onClick={onClick}>
      <div className={classes.basicInfoContainer}>
        <div>{character.name || "Jimmy"}</div>
        <div>{`Level ${character.level || 1} ${
          character.class || "Rogue"
        }`}</div>
      </div>
      <div className={classes.attributesContainer}>
        {Object.entries(character.attributes).map((attribute) => {
          const [label, value] = attribute;
          return (
            <div className={classes.attribute}>
              <div>{label.substring(0, 3).toUpperCase()}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.skillsContainer}>
          {character.skills.map((skill) => {
            return <div className={classes.skill}>{skill}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
