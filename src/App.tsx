// React

import { useContext } from "react";

// Context

import { ScreenSizeContext } from "./context/ScreenSizeContext";

// Components

import CharacterManagementTool from "./tools/character-management-tool/CharacterManagementTool";

// Assets

import SwordsPNG from "./assets/swords.png";

// Styles

import classes from "./styles.module.css";

const App = (): JSX.Element => {
  const { isScreenUnsupported } = useContext(ScreenSizeContext);

  return (
    <div className={classes.app}>
      {isScreenUnsupported ? (
        <img
          src={SwordsPNG}
          alt={"Unsupported"}
          className={classes.unsupportedImage}
          height={48}
        />
      ) : (
        <CharacterManagementTool />
      )}
    </div>
  );
};

export default App;
