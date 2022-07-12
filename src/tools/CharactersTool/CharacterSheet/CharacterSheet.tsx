// React

import { useContext, useEffect, useState } from "react";

// Custom Components

import TextInput from "../../../components/TextInput/TextInput";
import AttributeContainer from "../../../components/AttributeContainer/AttributeContainer";
import SkillContainer from "../../../components/SkillContainer/SkillContainer";

// Context

import { CharactersContext } from "../../../context/CharactersContext";

// Enums

import { Character, Skills } from "../../../types/Character";

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
  const [character, setCharacter] = useState<Character>({
    name: "",
    level: "",
    class: "",
    race: "",
    age: "",
    background: "",
    alignment: "",
    experience: "",
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    attributes: {
      strength: 8,
      dexterity: 8,
      constitution: 8,
      intelligence: 8,
      wisdom: 8,
      charisma: 8,
    },
    skills: [],
  });

  const { characters, setCharacters } = useContext(CharactersContext);

  useEffect(() => {
    return () => {
      const copy = characters ? [...characters, character] : [character];
      setCharacters(copy);
    };
  }, [character]);

  console.log(character);

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
              onChange={(event) => {
                const value: string = event.target.value;
                const copy: Character = { ...character };
                copy[textField.toLowerCase()] = value;
                setCharacter(copy);
              }}
            ></TextInput>
          );
        })}
      </div>
      <div className={classes.header} style={{ marginTop: "16px" }}>
        {Headers.Attributes}
      </div>
      <div className={classes.section}>
        {Object.values(AttributesLabels).map((label, index) => {
          return <AttributeContainer key={index} label={label} />;
        })}
      </div>
      <div className={classes.header} style={{ marginTop: "16px" }}>
        {Headers.Skills}
      </div>
      <div className={classes.section}>
        {skillsAttributesMap.map((data, index) => {
          const [skill, attribute] = data;
          return (
            <SkillContainer key={index} skill={skill} attribute={attribute} />
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSheet;
