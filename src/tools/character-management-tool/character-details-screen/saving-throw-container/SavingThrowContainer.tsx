// React

import { useCallback, useMemo, useState } from "react";

// Utils

import { roll } from "../../../../utils";

// Styles

import classes from "./styles.module.css";

interface SavingThrowContainerProps {
  label: string;
  isProficient: boolean;
  proficiencyBonus: number;
  relevantAttribute: string;
  relevantAttributeModifier: number;
  handleToggle: () => void;
}

const SavingThrowContainer = (
  props: SavingThrowContainerProps
): JSX.Element => {
  const {
    label,
    isProficient,
    proficiencyBonus,
    relevantAttribute,
    relevantAttributeModifier,
    handleToggle,
  } = props;

  const [isHoveringOverHeader, setIsHoveringOverHeader] =
    useState<boolean>(false);

  const savingThrowModifier: number = useMemo(
    () =>
      isProficient
        ? proficiencyBonus + relevantAttributeModifier
        : relevantAttributeModifier,
    [isProficient, proficiencyBonus, relevantAttributeModifier]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const check: number = roll(20);
      const message: string = `${check} ${
        savingThrowModifier >= 0 ? "+" : "-"
      } ${Math.abs(savingThrowModifier)} = ${check + savingThrowModifier}`;
      alert(message);
    },
    [savingThrowModifier]
  );

  return (
    <div
      className={classes.savingThrowContainer}
      style={{
        backgroundColor: isProficient ? "lightgreen" : "lavender",
      }}
      onClick={handleToggle}
    >
      <div
        className={classes.header}
        onClick={handleClick}
        style={{ textDecoration: isHoveringOverHeader ? "underline" : "none" }}
        onMouseOver={() => setIsHoveringOverHeader(true)}
        onMouseOut={() => setIsHoveringOverHeader(false)}
      >
        {label}
      </div>
      <div className={classes.pointsContainer}>
        <div className={classes.modifier}>
          {savingThrowModifier >= 0
            ? `+${savingThrowModifier}`
            : savingThrowModifier}
        </div>
      </div>
      <div className={classes.attribute}>{`(${relevantAttribute})`}</div>
    </div>
  );
};

export default SavingThrowContainer;
