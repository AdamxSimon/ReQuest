// React

import { useContext } from "react";

// Context

import { ModalContext } from "../../../../../context/ModalContext";

// Components

import SpellDetailsModal from "../../../../../modals/spell-details-modal/SpellDetailsModal";

// Assets

import ExaminePNG from "../../../../../assets/examine.png";
import MinusPNG from "../../../../../assets/minus.png";
import PlusPNG from "../../../../../assets/plus.png";

// Types

import { Spell } from "../../../../../types/Character";

// Styles

import classes from "./styles.module.css";

interface SpellContainerProps {
  spell?: Spell;
  spellLevel: number;
  index: number;
  handleToggleSpell?: (level: number, index: number) => void;
  handleRemoveSpell?: (spell: Spell, level: number) => void;
  handleAddSpell?: (spell: Spell, level: number) => void;
  handleEditSpell?: (spell: Spell, level: number, index: number) => void;
}

const SpellContainer = (props: SpellContainerProps): JSX.Element => {
  const {
    spell,
    spellLevel,
    index,
    handleToggleSpell,
    handleRemoveSpell,
    handleAddSpell,
    handleEditSpell,
  } = props;

  const { presentComponentAsModal } = useContext(ModalContext);

  return (
    <div className={classes.spell}>
      {spell && handleToggleSpell && (
        <div
          className={classes.preparedSelector}
          style={{ backgroundColor: spell?.isPrepared ? "black" : undefined }}
          onClick={() => {
            handleToggleSpell(spellLevel, index);
          }}
        ></div>
      )}

      <div className={classes.name}>{spell?.name}</div>

      <div className={classes.optionsContainer}>
        {spell && handleRemoveSpell && handleEditSpell && (
          <>
            <img
              src={MinusPNG}
              alt={"Remove Spell"}
              height={16}
              onClick={() => handleRemoveSpell(spell, spellLevel)}
            />
            <img
              src={ExaminePNG}
              alt={"Edit Spell"}
              height={16}
              onClick={() =>
                presentComponentAsModal(
                  <SpellDetailsModal
                    initialSpellState={spell}
                    level={spellLevel}
                    index={index}
                    handleEditSpell={handleEditSpell}
                  />
                )
              }
            />
          </>
        )}

        {!spell && handleAddSpell && (
          <img
            src={PlusPNG}
            alt={"Add Spell"}
            height={16}
            onClick={() =>
              presentComponentAsModal(
                <SpellDetailsModal
                  level={spellLevel}
                  handleAddSpell={handleAddSpell}
                />
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default SpellContainer;
