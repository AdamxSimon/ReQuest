// React

import React, { useCallback, useRef } from "react";

// Components

import AttributeContainer from "./attribute-container/AttributeContainer";
import CollapsibleContainer from "./collapsible-container/CollapsibleContainer";
import SavingThrowContainer from "./saving-throw-container/SavingThrowContainer";
import SkillContainer from "./skill-container/SkillContainer";
import SpellLevelContainer from "./spell-level-container/SpellLevelContainer";
import LabeledInput from "../../../components/labeled-input/LabeledInput";

// Utils

import { convertKeyToLabel, getAttributeModifier } from "../../../utils";

// Assets

import PlusPNG from "../../../assets/plus.png";
import MinusPNG from "../../../assets/minus.png";

// Types

import {
  Attributes,
  Character,
  Info,
  SavingThrows,
  Spell,
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

  const updateSlotsLeft = useCallback(
    (level: number, value: string) => {
      if (typeof Number(value) === "number") {
        const characterBeingEditedCopy = { ...characterBeingEdited };
        characterBeingEditedCopy.spellLevels[level].slotsLeft = +value;
        setCharacterBeingEdited(characterBeingEditedCopy);
      }
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const updateSlotsTotal = useCallback(
    (level: number, value: string) => {
      if (typeof Number(value) === "number") {
        const characterBeingEditedCopy = { ...characterBeingEdited };
        characterBeingEditedCopy.spellLevels[level].slotsTotal = +value;
        setCharacterBeingEdited(characterBeingEditedCopy);
      }
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const removeSpellLevel = useCallback((): void => {
    if (characterBeingEdited.spellLevels.length > 1) {
      setCharacterBeingEdited({
        ...characterBeingEdited,
        spellLevels: characterBeingEdited.spellLevels.slice(0, -1),
      });
    }
  }, [characterBeingEdited, setCharacterBeingEdited]);

  const addSpellLevel = useCallback((): void => {
    setCharacterBeingEdited({
      ...characterBeingEdited,
      spellLevels: [
        ...characterBeingEdited.spellLevels,
        { spells: [], slotsLeft: 0, slotsTotal: 0 },
      ],
    });
  }, [characterBeingEdited, setCharacterBeingEdited]);

  const removeSpell = useCallback(
    (spell: Spell, level: number): void => {
      setCharacterBeingEdited({
        ...characterBeingEdited,
        spellLevels: [
          ...characterBeingEdited.spellLevels.slice(0, level),
          {
            ...characterBeingEdited.spellLevels[level],
            spells: [
              ...characterBeingEdited.spellLevels[level].spells.filter(
                (data) => data.name !== spell.name
              ),
            ],
          },
          ...characterBeingEdited.spellLevels.slice(level + 1),
        ],
      });
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const addSpell = useCallback(
    (spell: Spell, level: number): void => {
      if (
        !characterBeingEdited.spellLevels[level].spells.find(
          (data) => data.name === spell.name
        )
      ) {
        setCharacterBeingEdited({
          ...characterBeingEdited,
          spellLevels: [
            ...characterBeingEdited.spellLevels.slice(0, level),
            {
              ...characterBeingEdited.spellLevels[level],
              spells: [
                ...characterBeingEdited.spellLevels[level].spells,
                spell,
              ],
            },
            ...characterBeingEdited.spellLevels.slice(level + 1),
          ],
        });
      }
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const editSpell = useCallback(
    (spell: Spell, level: number, index: number): void => {
      const characterBeingEditedCopy: Character = { ...characterBeingEdited };
      characterBeingEditedCopy.spellLevels[level].spells[index] = spell;
      setCharacterBeingEdited(characterBeingEditedCopy);
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const toggleSpell = useCallback(
    (level: number, index: number): void => {
      const characterBeingEditedCopy: Character = { ...characterBeingEdited };
      characterBeingEditedCopy.spellLevels[level].spells[index] = {
        ...characterBeingEditedCopy.spellLevels[level].spells[index],
        isPrepared:
          !characterBeingEdited.spellLevels[level].spells[index].isPrepared,
      };
      setCharacterBeingEdited(characterBeingEditedCopy);
    },
    [characterBeingEdited, setCharacterBeingEdited]
  );

  const updateCharacterNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setCharacterBeingEdited({
        ...characterBeingEdited,
        notes: event.target.value,
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
              <LabeledInput
                key={convertKeyToLabel(key)}
                label={convertKeyToLabel(key)}
                value={value}
                onChange={(event) => {
                  updateCharacterInfo(key as keyof Info, event.target.value);
                }}
              ></LabeledInput>
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

      <CollapsibleContainer header={"Spells"}>
        <div
          className={classes.containerSection}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div className={classes.spellLevelsAdjustmentContainer}>
            <img
              src={MinusPNG}
              alt={"Remove Spell Level"}
              height={16}
              onClick={removeSpellLevel}
            />
            <img
              src={PlusPNG}
              alt={"Add Spell Level"}
              height={16}
              onClick={addSpellLevel}
            />
          </div>
          <div className={classes.spellLevelsContainer}>
            {characterBeingEdited.spellLevels.map((spellLevel, index) => {
              return (
                <SpellLevelContainer
                  key={index}
                  spellLevel={index}
                  spellLevelProps={spellLevel}
                  handleUpdateSlotsLeft={updateSlotsLeft}
                  handleUpdateSlotsTotal={updateSlotsTotal}
                  handleRemoveSpell={removeSpell}
                  handleAddSpell={addSpell}
                  handleEditSpell={editSpell}
                  handleToggleSpell={toggleSpell}
                />
              );
            })}
          </div>
        </div>
      </CollapsibleContainer>

      <CollapsibleContainer header={"Notes"}>
        <div className={classes.containerSection}>
          <textarea
            className={classes.notes}
            cols={0}
            rows={0}
            value={characterBeingEdited.notes}
            onChange={updateCharacterNotes}
          ></textarea>
        </div>
      </CollapsibleContainer>
    </div>
  );
};

export default CharacterDetailsScreen;
