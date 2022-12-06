// React

import { useCallback, useRef } from "react";

// Components

import AttributeContainer from "./attribute-container/AttributeContainer";
import CollapsibleContainer from "./collapsible-container/CollapsibleContainer";
import SavingThrowContainer from "./saving-throw-container/SavingThrowContainer";
import SkillContainer from "./skill-container/SkillContainer";
import TextInput from "../../../components/text-input/TextInput";

// Utils

import { convertKeyToLabel, getAttributeModifier } from "../../../utils";

// Types

import {
  Attributes,
  Character,
  Info,
  SavingThrows,
} from "../../../types/Character";
import { Skills } from "../../../types/Character";

// Styles

import classes from "./styles.module.css";

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

  const updateCharacterInfo = useCallback(
    (key: keyof Info, value: string): void => {
      setCharacterBeingEdited({
        ...characterBeingEdited,
        info: { ...characterBeingEdited.info, [key]: value },
      });
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const updateCharacterAttribute = useCallback(
    (key: keyof Attributes, value: number): void => {
      setCharacterBeingEdited({
        ...characterBeingEdited,
        attributes: { ...characterBeingEdited.attributes, [key]: value },
      });
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const updateCharacterSavingThrows = useCallback(
    (savingThrow: keyof SavingThrows): void => {
      const isProficient: boolean =
        characterBeingEdited.savingThrows[savingThrow] === true;
      setCharacterBeingEdited({
        ...characterBeingEdited,
        savingThrows: {
          ...characterBeingEdited.savingThrows,
          [savingThrow]: !isProficient,
        },
      });
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const updateCharacterSkills = useCallback(
    (skill: keyof Skills): void => {
      const isProficient: boolean =
        characterBeingEdited.skills[skill].isProficient;
      setCharacterBeingEdited({
        ...characterBeingEdited,
        skills: {
          ...characterBeingEdited.skills,
          [skill]: {
            isProficient: !isProficient,
            relevantAttribute:
              characterBeingEdited.skills[skill].relevantAttribute,
          },
        },
      });
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  return (
    <div className={classes.characterSheet}>
      <CollapsibleContainer header={"Basic Info"}>
        <div className={classes.gridSection}>
          {Object.entries(characterBeingEdited.info).map((map) => {
            const [key, value] = map;
            return (
              <TextInput
                key={convertKeyToLabel(key)}
                placeholder={convertKeyToLabel(key)}
                value={value}
                onChange={(event) => {
                  updateCharacterInfo(key as keyof Info, event.target.value);
                }}
              ></TextInput>
            );
          })}
        </div>
      </CollapsibleContainer>

      <CollapsibleContainer header={"Proficiency Bonus"}>
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
            {`+${characterBeingEdited.proficiencyBonus}`}
          </div>
          <input
            ref={sliderRef}
            type="range"
            className={classes.slider}
            value={characterBeingEdited.proficiencyBonus}
            onInput={() => {
              setCharacterBeingEdited({
                ...characterBeingEdited,
                proficiencyBonus: sliderRef.current
                  ? +sliderRef.current.value
                  : 0,
              });
            }}
          />
        </div>
      </CollapsibleContainer>

      <CollapsibleContainer header={"Attributes"}>
        <div className={classes.gridSection}>
          {Object.entries(characterBeingEdited.attributes).map((map) => {
            const [key, value] = map;
            return (
              <AttributeContainer
                key={convertKeyToLabel(key)}
                label={convertKeyToLabel(key)}
                points={value}
                handleDecrement={() => {
                  updateCharacterAttribute(key as keyof Attributes, value - 1);
                }}
                handleIncrement={() => {
                  updateCharacterAttribute(key as keyof Attributes, value + 1);
                }}
              />
            );
          })}
        </div>
      </CollapsibleContainer>

      <CollapsibleContainer header={"Saving Throws"}>
        <div className={classes.gridSection}>
          {Object.entries(characterBeingEdited.savingThrows).map((map) => {
            const [key, value] = map;
            const relevantAttributeKey = key as keyof Attributes;
            return (
              <SavingThrowContainer
                key={convertKeyToLabel(key)}
                label={convertKeyToLabel(key)}
                isProficient={value}
                proficiencyBonus={characterBeingEdited.proficiencyBonus}
                relevantAttribute={convertKeyToLabel(relevantAttributeKey)}
                relevantAttributeModifier={getAttributeModifier(
                  characterBeingEdited.attributes[relevantAttributeKey]
                )}
                handleToggle={() => {
                  updateCharacterSavingThrows(key as keyof SavingThrows);
                }}
              />
            );
          })}
        </div>
      </CollapsibleContainer>

      <CollapsibleContainer header={"Skills"}>
        <div className={classes.gridSection}>
          {Object.entries(characterBeingEdited.skills).map((map) => {
            const [key, value] = map;
            return (
              <SkillContainer
                key={convertKeyToLabel(key)}
                label={convertKeyToLabel(key)}
                isProficient={value.isProficient}
                proficiencyBonus={characterBeingEdited.proficiencyBonus}
                relevantAttribute={convertKeyToLabel(value.relevantAttribute)}
                relevantAttributeModifier={getAttributeModifier(
                  characterBeingEdited.attributes[value.relevantAttribute]
                )}
                handleToggle={() => {
                  updateCharacterSkills(key as keyof Skills);
                }}
              />
            );
          })}
        </div>
      </CollapsibleContainer>
    </div>
  );
};

export default CharacterDetailsScreen;
