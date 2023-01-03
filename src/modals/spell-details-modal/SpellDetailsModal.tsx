// React

import { useCallback, useContext, useMemo, useState } from "react";

// Context

import { ModalContext } from "../../context/ModalContext";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";
import { SpellsContext } from "../../context/SpellsContext";
import { Spell } from "../../types/Character";

// Components

import Button from "../../components/button/Button";
import LabeledInput from "../../components/labeled-input/LabeledInput";
import LabeledTextArea from "../../components/labeled-text-area/LabeledTextArea";
import SearchBar from "../../components/search-bar/SearchBar";

// Styles

import classes from "./styles.module.css";

interface SpellDetailsModalProps {
  initialSpellState?: Spell;
  level: number;
  index?: number;
  handleAddSpell?: (spell: Spell, level: number) => void;
  handleEditSpell?: (spell: Spell, level: number, index: number) => void;
}

const SpellDetailsModal = (props: SpellDetailsModalProps): JSX.Element => {
  const { initialSpellState, level, index, handleAddSpell, handleEditSpell } =
    props;

  const { dismissModal } = useContext(ModalContext);
  const { isSmallScreen } = useContext(ScreenSizeContext);
  const { spells } = useContext(SpellsContext);

  const [spellBeingEdited, setSpellBeingEdited] = useState<Spell>(
    initialSpellState || new Spell()
  );

  const handleSpellSelection = useCallback(
    (selection: string): void => {
      const spell: Spell | undefined = spells.find(
        (spell) => spell.name === selection
      );
      if (spell) setSpellBeingEdited(spell);
    },
    [spells]
  );

  const damage: string = useMemo(() => {
    if (spellBeingEdited?.damage?.custom_damage)
      return spellBeingEdited.damage.custom_damage;

    if (spellBeingEdited?.damage?.damage_at_slot_level)
      return Object.entries(spellBeingEdited.damage.damage_at_slot_level)
        .map((entry) => {
          const [key, value] = entry;
          return "Slot " + key + ": " + value;
        })
        .join("\r\n\n");

    if (spellBeingEdited?.damage?.damage_at_character_level)
      return Object.entries(spellBeingEdited.damage.damage_at_character_level)
        .map((entry) => {
          const [key, value] = entry;
          return "Level " + key + ": " + value;
        })
        .join("\r\n\n");

    return "";
  }, [spellBeingEdited]);

  return (
    <div
      className={classes.spellDetailsModal}
      style={{
        height: isSmallScreen ? "100%" : "80vh",
        width: isSmallScreen ? "100%" : 600,
      }}
    >
      <div className={classes.spellFieldsOverflow}>
        <div className={classes.spellFields}>
          <SearchBar
            results={spells.map((spell) => spell.name)}
            onSelect={handleSpellSelection}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Name"}
            value={spellBeingEdited.name}
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                name: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledTextArea
            label={"Description"}
            value={spellBeingEdited.desc.join("\r\n\n")}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                desc: [event.target.value],
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledTextArea
            label={"Higher Levels"}
            value={spellBeingEdited.higher_level.join("\r\n\n")}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                higher_level: [event.target.value],
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Range"}
            value={spellBeingEdited.range}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                range: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Components"}
            value={
              typeof spellBeingEdited.components === "string"
                ? spellBeingEdited.components
                : spellBeingEdited.components.join(", ")
            }
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                components: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Materials"}
            value={spellBeingEdited.material}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                material: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Duration"}
            value={spellBeingEdited.duration}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                duration: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Concentration"}
            value={String(spellBeingEdited.concentration)}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                concentration: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Casting Time"}
            value={spellBeingEdited.casting_time}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                casting_time: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Attack Type"}
            value={spellBeingEdited.attack_type}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                attack_type: event.target.value,
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledTextArea
            label={"Damage"}
            value={damage}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                damage: {
                  ...spellBeingEdited.damage,
                  custom_damage: event.target.value,
                },
              });
            }}
            style={{ width: "100%" }}
          />

          <LabeledInput
            label={"Damage Type"}
            value={spellBeingEdited?.damage?.damage_type?.name || ""}
            isCollapsible
            onChange={(event) => {
              setSpellBeingEdited({
                ...spellBeingEdited,
                damage: {
                  ...spellBeingEdited.damage,
                  damage_type: {
                    ...spellBeingEdited.damage?.damage_type,
                    name: event.target.value,
                  },
                },
              });
            }}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className={classes.buttonsContainer}>
        <Button
          text={"Back"}
          onClick={() => {
            dismissModal();
          }}
        />

        {handleAddSpell && (
          <Button
            text={"Add Spell"}
            onClick={() => {
              handleAddSpell(spellBeingEdited, level);
              dismissModal();
            }}
          />
        )}

        {handleEditSpell && index !== undefined && (
          <Button
            text={"Edit Spell"}
            onClick={() => {
              handleEditSpell(spellBeingEdited, level, index);
              dismissModal();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SpellDetailsModal;
