// React

import { useCallback, useMemo, useState } from "react";

// Utils

import { roll } from "../../../../utils";

// Styles

import classes from "./styles.module.css";

interface SkillContainerProps {
  label: string;
  isProficient: boolean;
  proficiencyBonus: number;
  relevantAttribute: string;
  relevantAttributeModifier: number;
  handleToggle: () => void;
}

const SkillContainer = (props: SkillContainerProps): JSX.Element => {
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

  const modifier: number = useMemo(
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
      const message: string = `${check} ${modifier >= 0 ? "+" : "-"} ${Math.abs(
        modifier
      )} = ${check + modifier}`;
      alert(message);
    },
    [modifier]
  );

  return (
    <div
      className={classes.skillContainer}
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
          {modifier >= 0 ? `+${modifier}` : modifier}
        </div>
      </div>
      <div className={classes.attribute}>{`(${relevantAttribute})`}</div>
    </div>
  );
};

export default SkillContainer;
