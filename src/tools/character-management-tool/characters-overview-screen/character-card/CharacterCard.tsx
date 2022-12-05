// Types

import { useMemo } from "react";
import { Character } from "../../../../types/Character";

// Styles

import classes from "./styles.module.css";
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { character, onClick } = props;

  const characterHasSkills: boolean = useMemo(() => {
    return character.skills.length > 0;
  }, [character.skills.length]);

  return (
    <div className={classes.characterCard} onClick={onClick}>
      <div className={classes.basicInfoContainer}>
        <div>{character.name || "No Name"}</div>
        <div>
          {character.level && character.class
            ? `Level ${character.level} ${character.class}`
            : ""}
        </div>
      </div>
      <div className={classes.attributesContainer}>
        {Object.entries(character.attributes).map((attribute) => {
          const [label, value] = attribute;
          return (
            <div key={label} className={classes.attribute}>
              <div>{label.substring(0, 3).toUpperCase()}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>

      {characterHasSkills ? (
        <div className={classes.skillsContainer}>
          <div className={classes.skillsContainerOverflow}>
            {character.skills.map((skill) => {
              return (
                <div key={skill} className={classes.skill}>
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={classes.emptySkillsContainer}>{"No Skills"}</div>
      )}
    </div>
  );
};

export default CharacterCard;
