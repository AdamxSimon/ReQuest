// React

import { useRef } from "react";

// Components

import AttributeContainer from "./attribute-container/AttributeContainer";
import SavingThrowContainer from "./saving-throw-container/SavingThrowContainer";
import SkillContainer from "./skill-container/SkillContainer";
import TextInput from "../../../components/text-input/TextInput";

// Types

import { Character } from "../../../types/Character";
import { Skills } from "../../../types/Character";

// Styles

import classes from "./styles.module.css";

enum Headers {
  BasicInfo = "Basic Info",
  Proficiency = "Proficiency",
  Attributes = "Attributes",
  SavingThrows = "Saving Throws",
  Skills = "Skills",
  Picture = "Picture",
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

interface CharacterDetailsScreenProps {
  characterBeingEdited: Character;
  setCharacterBeingEdited: React.Dispatch<
    React.SetStateAction<Character | null>
  >;
}

const CharacterDetailsScreen = (
  props: CharacterDetailsScreenProps
): JSX.Element => {
  const { characterBeingEdited, setCharacterBeingEdited } = props;

  const sliderRef = useRef<HTMLInputElement>(null);

  const character: Character = characterBeingEdited;

  const updateCharacterText = (key: string, value: string): void => {
    const copy: Character = { ...character };
    copy[key] = value;
    setCharacterBeingEdited(copy);
  };

  const updateCharacterAttributes = (key: string, value: number): void => {
    const copy: Character = { ...character };
    copy.attributes[key] = value;
    setCharacterBeingEdited(copy);
  };

  const updateCharacterSkills = (skill: Skills, proficient: boolean): void => {
    const copy: Character = { ...character };
    if (proficient && !copy.skills.includes(skill)) {
      copy.skills.push(skill);
    } else if (!proficient && copy.skills.includes(skill)) {
      copy.skills.splice(copy.skills.indexOf(skill), 1);
    }
    setCharacterBeingEdited(copy);
  };

  return (
    <div className={classes.characterSheet}>
      <div className={classes.header}>{Headers.BasicInfo}</div>
      <div className={classes.gridSection}>
        {Object.values(TextFields).map((textField, index) => {
          return (
            <TextInput
              key={index}
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

      <div className={classes.header}>{Headers.Proficiency}</div>
      <div className={classes.containerSection}>
        <div
          style={{
            width: "100%",
            paddingBottom: 8,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {`+${character.proficiencyBonus}`}
        </div>
        <input
          ref={sliderRef}
          type="range"
          className={classes.slider}
          value={character.proficiencyBonus}
          onInput={() => {
            setCharacterBeingEdited({
              ...character,
              proficiencyBonus: sliderRef.current
                ? +sliderRef.current.value
                : 0,
            });
          }}
        />
      </div>

      <div className={classes.header}>{Headers.Attributes}</div>
      <div className={classes.gridSection}>
        {Object.values(AttributesLabels).map((label, index) => {
          return (
            <AttributeContainer
              key={index}
              label={label}
              initialPointsState={
                character.attributes[label.toLowerCase()] as number
              }
              updateCharacterAttributes={updateCharacterAttributes}
              character={characterBeingEdited}
            />
          );
        })}
      </div>

      <div className={classes.header}>{Headers.SavingThrows}</div>
      <div className={classes.gridSection}>
        {Object.values(AttributesLabels).map((attribute, index) => {
          return (
            <SavingThrowContainer
              key={index}
              attribute={attribute}
              character={character}
              setCharacterBeingEdited={setCharacterBeingEdited}
            />
          );
        })}
      </div>

      <div className={classes.header}>{Headers.Skills}</div>
      <div className={classes.gridSection}>
        {skillsAttributesMap.map((data, index) => {
          const [skill, attribute] = data;
          return (
            <SkillContainer
              key={index}
              skill={skill}
              attribute={attribute}
              initialProficientState={character.skills.includes(skill)}
              updateCharacterSkills={updateCharacterSkills}
              character={character}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CharacterDetailsScreen;
