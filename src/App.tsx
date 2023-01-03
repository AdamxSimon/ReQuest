// React

import { useContext } from "react";

// Context

import { ScreenSizeContext } from "./context/ScreenSizeContext";

// Overlays

import ModalOverlay from "./overlays/modal-overlay/ModalOverlay";

// Components

import CharacterManagementTool from "./tools/character-management-tool/CharacterManagementTool";

// Assets

import SwordsPNG from "./assets/swords.png";

// Styles

import classes from "./styles.module.css";

const App = (): JSX.Element => {
  const { isScreenUnsupported } = useContext(ScreenSizeContext);

  if (isScreenUnsupported) {
    return (
      <div className={classes.unsupportedContainer}>
        <img
          src={SwordsPNG}
          alt={"Unsupported"}
          className={classes.unsupportedImage}
          height={48}
        />
      </div>
    );
  }

  return (
    <div className={classes.app}>
      <CharacterManagementTool />
      <ModalOverlay />
    </div>
  );
};

export default App;
