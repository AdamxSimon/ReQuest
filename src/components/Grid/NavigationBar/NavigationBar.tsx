// React

import { useState } from "react";

// Styles

import classes from "./styles.module.css";

const NavigationBar = (): JSX.Element => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggleHandler = (): void => {
    setIsShowing(!isShowing);
  };

  const slidePosition: { top: number } = isShowing ? { top: 0 } : { top: -100 };
  const arrow: string = isShowing ? "⮝" : "⮟";

  return (
    <div className={classes.navigationBarContainer} style={slidePosition}>
      <div className={classes.navigationBar}></div>
      <div className={classes.toggleButton} onClick={toggleHandler}>
        {arrow}
      </div>
    </div>
  );
};

export default NavigationBar;
