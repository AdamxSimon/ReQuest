// Interfaces

import { Character } from "../../types/Character";

// Styles

import classes from "./styles.module.css";
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

enum AttributeLabels {
  Strength = "STR",
  Dexterity = "DEX",
  Constitution = "CON",
  Intelligence = "INT",
  Wisdom = "WIS",
  Charisma = "CHA",
}

const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { character, onClick } = props;

  const attributesMap: [AttributeLabels, number][] = [
    [AttributeLabels.Strength, character.attributes.strength],
    [AttributeLabels.Dexterity, character.attributes.dexterity],
    [AttributeLabels.Constitution, character.attributes.constitution],
    [AttributeLabels.Intelligence, character.attributes.intelligence],
    [AttributeLabels.Wisdom, character.attributes.wisdom],
    [AttributeLabels.Charisma, character.attributes.charisma],
  ];

  return (
    <div className={classes.characterCard} onClick={onClick}>
      <div className={classes.infoContainer}>
        <div className={classes.info}>
          <img
            className={classes.infoImage}
            src={require("../../assets/heart.png")}
          />
          <div className={classes.infoValue}>{character.health}</div>
        </div>
        <div className={classes.info}>
          <img
            className={classes.infoImage}
            src={require("../../assets/swords.png")}
          />
          <div className={classes.infoValue}>{character.attack}</div>
        </div>
        <div className={classes.portrait}>
          <img src={require("../../assets/person.png")} />
          <div className={classes.nameContainer}>{character.name}</div>
        </div>
        <div className={classes.info}>
          <img
            className={classes.infoImage}
            src={require("../../assets/shield.png")}
          />
          <div className={classes.infoValue}>{character.defense}</div>
        </div>
        <div className={classes.info}>
          <img
            className={classes.infoImage}
            src={require("../../assets/boots.png")}
          />
          <div className={classes.infoValue}>{character.speed}</div>
        </div>
      </div>
      <div className={classes.attributesContainer}>
        {attributesMap.map((attribute, index) => {
          const [label, value] = attribute;
          return (
            <div key={index} className={classes.attribute}>
              <div className={classes.label}>{label}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.skillsContainer}>
        {character.skills.map((skill, index) => {
          return (
            <div key={index} className={classes.skill}>
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterCard;
