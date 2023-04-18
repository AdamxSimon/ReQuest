// React

import { useMemo } from "react";

// Components

import SpellContainer from "./spell-container/SpellContainer";

// Types

import { Spell, SpellLevelProps } from "../../../../types/Character";

// Styles

import classes from "./styles.module.css";

interface SpellLevelContainerProps {
  spellLevel: number;
  spellLevelProps: SpellLevelProps;
  handleUpdateSlotsLeft: (level: number, value: string) => void;
  handleUpdateSlotsTotal: (level: number, value: string) => void;
  handleRemoveSpell: (spell: Spell, level: number) => void;
  handleAddSpell: (spell: Spell, level: number) => void;
  handleEditSpell: (spell: Spell, level: number, index: number) => void;
  handleToggleSpell: (level: number, index: number) => void;
}

const SpellLevelContainer = (props: SpellLevelContainerProps): JSX.Element => {
  const {
    spellLevel,
    spellLevelProps,
    handleUpdateSlotsLeft,
    handleUpdateSlotsTotal,
    handleRemoveSpell,
    handleAddSpell,
    handleEditSpell,
    handleToggleSpell,
  } = props;

  const isCantrips: boolean = useMemo(() => {
    return spellLevel === 0;
  }, [spellLevel]);

  return (
    <div className={classes.spellLevelContainer}>
      <div className={classes.headerContainer}>
        <div className={classes.level}>
          {isCantrips ? "Cantrips" : `Level ${spellLevel}`}
        </div>

        {!isCantrips && (
          <div className={classes.slotsContainer}>
            <input
              className={classes.slotsInput}
              type="text"
              onChange={(event) => {
                const value =
                  event.target.value === "" ? "0" : event.target.value;
                handleUpdateSlotsLeft(spellLevel, value);
              }}
              onFocus={(event) => {
                event.target.select();
              }}
              value={spellLevelProps.slotsLeft}
            />

            <div>{"/"}</div>

            <input
              className={classes.slotsInput}
              type="text"
              onChange={(event) => {
                const value =
                  event.target.value === "" ? "0" : event.target.value;
                handleUpdateSlotsTotal(spellLevel, value);
              }}
              onFocus={(event) => {
                event.target.select();
              }}
              value={spellLevelProps.slotsTotal}
            />
          </div>
        )}
      </div>

      <div className={classes.spellsContainer}>
        {spellLevelProps.spells.map((spell, index) => {
          return (
            <SpellContainer
              key={spell.name}
              spell={spell}
              spellLevel={spellLevel}
              index={index}
              handleRemoveSpell={handleRemoveSpell}
              handleEditSpell={handleEditSpell}
              handleToggleSpell={handleToggleSpell}
            />
          );
        })}
        <SpellContainer
          key={"Empty Spell Container"}
          spellLevel={spellLevel}
          index={spellLevelProps.spells.length}
          handleAddSpell={handleAddSpell}
        />
      </div>
    </div>
  );
};

export default SpellLevelContainer;
