// Types

import { useMemo } from "react";
import { Character } from "../../../../types/Character";
import { convertKeyToLabel } from "../../../../utils";

// Styles

import classes from "./styles.module.css";
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { character, onClick } = props;

  const characterIsProficientInSomeSkills: boolean = useMemo(() => {
    return Object.values(character.skills).some((skill) => skill.isProficient);
  }, [character]);

  return (
    <div className={classes.characterCard} onClick={onClick}>
      <div className={classes.basicInfoContainer}>
        <div>{character.info.name || "No Name"}</div>
        <div>
          {character.info.level && character.info.class
            ? `Level ${character.info.level} ${character.info.class}`
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

      {characterIsProficientInSomeSkills ? (
        <div className={classes.skillsContainer}>
          <div className={classes.skillsContainerOverflow}>
            {Object.entries(character.skills)
              .filter(([, value]) => value.isProficient)
              .map((map) => {
                const [key] = map;
                const label: string = convertKeyToLabel(key);
                return (
                  <div key={label} className={classes.skill}>
                    {convertKeyToLabel(key)}
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
