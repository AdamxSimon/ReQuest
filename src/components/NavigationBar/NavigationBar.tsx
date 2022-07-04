// React

import { Dispatch, SetStateAction, useState } from "react";

// Custom Components

import NavigationTab from "../NavigationTab/NavigationTab";

// Enums

import { Tools } from "../../App";

// Styles

import classes from "./styles.module.css";

interface NavigationBarProps {
  setCurrentTool: Dispatch<SetStateAction<Tools>>;
}

const NavigationBar = (props: NavigationBarProps): JSX.Element => {
  const { setCurrentTool } = props;

  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggleHandler = (): void => {
    setIsShowing(!isShowing);
  };

  const slidePosition: { top: number } = isShowing ? { top: 0 } : { top: -100 };
  const arrow: string = isShowing ? "⮝" : "⮟";

  return (
    <div className={classes.navigationBarContainer} style={slidePosition}>
      <div className={classes.navigationBar}>
        <NavigationTab
          label="Characters"
          setCurrentTool={() => {
            setCurrentTool(Tools.Characters);
            setIsShowing(false);
          }}
        />
        <NavigationTab
          label="Enemies"
          setCurrentTool={() => {
            setCurrentTool(Tools.Enemies);
            setIsShowing(false);
          }}
        />
        <NavigationTab
          label="Items"
          setCurrentTool={() => {
            setCurrentTool(Tools.Items);
            setIsShowing(false);
          }}
        />
        <NavigationTab
          label="Combat"
          setCurrentTool={() => {
            setCurrentTool(Tools.Combat);
            setIsShowing(false);
          }}
        />
      </div>
      <div className={classes.toggleButton} onClick={toggleHandler}>
        {arrow}
      </div>
    </div>
  );
};

export default NavigationBar;
