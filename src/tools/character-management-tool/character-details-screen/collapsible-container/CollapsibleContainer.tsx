// React

import { useState } from "react";

// Assets

import DropdownArrowPNG from "../../../../assets/dropdown-arrow.png";

// Styles

import classes from "./styles.module.css";

interface CollapsibleContainerProps {
  header: string;
  children: JSX.Element;
}

const CollapsibleContainer = (
  props: CollapsibleContainerProps
): JSX.Element => {
  const { header, children } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className={classes.collapsibleContainer}>
      <div
        className={classes.headerContainer}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <div className={classes.header}>{header}</div>
        <img
          src={DropdownArrowPNG}
          alt={"Dropdown Arrow"}
          height={16}
          className={classes.dropdownArrow}
          style={{ transform: isCollapsed ? "rotate(180deg)" : "none" }}
        />
      </div>

      {!isCollapsed && (
        <div className={classes.contentContainer}>{children}</div>
      )}
    </div>
  );
};

export default CollapsibleContainer;
