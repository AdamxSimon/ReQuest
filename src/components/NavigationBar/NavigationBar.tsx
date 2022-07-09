// React

import { Dispatch, SetStateAction, useState } from "react";

// Custom Components

import NavigationTab from "../NavigationTab/NavigationTab";

// Enums

import { Tools } from "../../App";

// Styles

import classes from "./styles.module.css";

enum NavigationTabLabels {
  Characters = "Characters",
  Enemies = "Enemies",
  Items = "Items",
  Combat = "Combat",
}

interface NavigationBarProps {
  setCurrentTool: Dispatch<SetStateAction<Tools>>;
}

const NavigationBar = (props: NavigationBarProps): JSX.Element => {
  const { setCurrentTool } = props;

  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggleHandler = (): void => {
    setIsShowing(!isShowing);
  };

  const navigationTabMap: [NavigationTabLabels, Tools][] = [
    [NavigationTabLabels.Characters, Tools.Characters],
    [NavigationTabLabels.Enemies, Tools.Enemies],
    [NavigationTabLabels.Items, Tools.Items],
    [NavigationTabLabels.Combat, Tools.Combat],
  ];

  const arrow: string = isShowing ? "⮝" : "⮟";

  const style = {
    top: isShowing ? 0 : -100,
    boxShadow: isShowing ? "0 2px 8px 4px gray" : "0 0 black",
  };

  return (
    <div className={classes.navigationBarContainer} style={style}>
      <div className={classes.navigationBar}>
        {navigationTabMap.map((navigationTab, index) => {
          const [label, tool] = navigationTab;
          return (
            <NavigationTab
              key={index}
              label={label}
              setCurrentTool={() => {
                setCurrentTool(tool);
                setIsShowing(false);
              }}
            />
          );
        })}
      </div>
      <div className={classes.toggleButton} onClick={toggleHandler}>
        {arrow}
      </div>
    </div>
  );
};

export default NavigationBar;
