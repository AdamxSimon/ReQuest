// React

import { useContext, useEffect, useState } from "react";

// Custom Components

import TextInput from "../TextInput/TextInput";
import AttributeContainer from "../AttributeContainer/AttributeContainer";
import SkillContainer from "../SkillContainer/SkillContainer";
import Button from "../Button/Button";

// Context

import { CharactersContext } from "../../context/CharactersContext";
import { CharactersToolContext } from "../../context/CharactersToolContext";

// Interfaces

import { Character } from "../../types/Character";

// Enums

import { Skills } from "../../types/Character";

// Styles

import classes from "./styles.module.css";

enum Headers {
  BasicInfo = "Basic Info",
  Attributes = "Attributes",
  Skills = "Skills",
}

enum TextFields {
  Name = "Name",
  Level = "Level",
  Class = "Class",
  Race = "Race",
  Age = "Age",
  Background = "Background",
  Alignment = "Alignment",
  Experience = "Experience",
}

enum AttributesLabels {
  Strength = "Strength",
  Dexterity = "Dexterity",
  Constitution = "Constitution",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Charisma = "Charisma",
}

enum Buttons {
  Save = "Save",
}

const skillsAttributesMap: [Skills, AttributesLabels][] = [
  [Skills.Acrobatics, AttributesLabels.Dexterity],
  [Skills.AnimalHandling, AttributesLabels.Wisdom],
  [Skills.Arcana, AttributesLabels.Intelligence],
  [Skills.Athletics, AttributesLabels.Strength],
  [Skills.Deception, AttributesLabels.Charisma],
  [Skills.History, AttributesLabels.Intelligence],
  [Skills.Insight, AttributesLabels.Wisdom],
  [Skills.Intimidation, AttributesLabels.Charisma],
  [Skills.Medicine, AttributesLabels.Wisdom],
  [Skills.Nature, AttributesLabels.Intelligence],
  [Skills.Perception, AttributesLabels.Wisdom],
  [Skills.Performance, AttributesLabels.Charisma],
  [Skills.Persuasion, AttributesLabels.Charisma],
  [Skills.Religion, AttributesLabels.Intelligence],
  [Skills.SleightOfHand, AttributesLabels.Dexterity],
  [Skills.Stealth, AttributesLabels.Dexterity],
  [Skills.Survival, AttributesLabels.Wisdom],
];

const CharacterSheet = (): JSX.Element => {
  const { selectedCharacterIndex, setSelectedCharacterIndex } = useContext(
    CharactersToolContext
  );
  const { characters, setCharacters } = useContext(CharactersContext);

  const initialCharacterState: Character =
    selectedCharacterIndex && selectedCharacterIndex >= 0
      ? { ...characters[selectedCharacterIndex] }
      : new Character();

  const [character, setCharacter] = useState<Character>(initialCharacterState);

  const updateCharacterText = (key: string, value: string): void => {
    const copy: Character = { ...character };
    copy[key] = value;
    setCharacter(copy);
  };

  const updateCharacterAttributes = (key: string, value: number): void => {
    const copy: Character = { ...character };
    copy.attributes[key] = value;
    setCharacter(copy);
  };

  const updateCharacterSkills = (skill: Skills, proficient: boolean): void => {
    const copy: Character = { ...character };
    if (proficient && !copy.skills.includes(skill)) {
      copy.skills.push(skill);
    } else if (!proficient && copy.skills.includes(skill)) {
      copy.skills.splice(copy.skills.indexOf(skill), 1);
    }
    setCharacter(copy);
  };

  useEffect(() => {
    return () => {
      setSelectedCharacterIndex(undefined);
    };
  }, []);

  return (
    <div className={classes.characterSheet}>
      <div className={classes.header}>{Headers.BasicInfo}</div>
      <div className={classes.section}>
        {Object.values(TextFields).map((textField, index) => {
          return (
            <TextInput
              key={index}
              style={{ flex: 1 }}
              placeholder={textField}
              value={character[textField.toLowerCase()] as string}
              onChange={(event) => {
                updateCharacterText(
                  textField.toLowerCase(),
                  event.target.value
                );
              }}
            ></TextInput>
          );
        })}
      </div>
      <div className={classes.header}>{Headers.Attributes}</div>
      <div className={classes.section}>
        {Object.values(AttributesLabels).map((label, index) => {
          return (
            <AttributeContainer
              key={index}
              label={label}
              initialPointsState={
                character.attributes[label.toLowerCase()] as number
              }
              updateCharacterAttributes={updateCharacterAttributes}
            />
          );
        })}
      </div>
      <div className={classes.header}>{Headers.Skills}</div>
      <div className={classes.section}>
        {skillsAttributesMap.map((data, index) => {
          const [skill, attribute] = data;
          return (
            <SkillContainer
              key={index}
              skill={skill}
              attribute={attribute}
              initialProficientState={character.skills.includes(skill)}
              updateCharacterSkills={updateCharacterSkills}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSheet;
