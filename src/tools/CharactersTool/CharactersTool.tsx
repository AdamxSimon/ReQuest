// React

import { useState } from "react";

// Custom Components

import CharacterCards from "./CharacterCards/CharacterCards";
import CharacterSheet from "./CharacterSheet/CharacterSheet";
import Button from "../../components/Button/Button";

// Styles

import classes from "./styles.module.css";

export enum CharacterViews {
  Cards,
  Sheet,
}

enum ToolbarButtons {
  Back = "Back",
  NewCharacter = "New Character",
  Save = "Save",
}

const CharactersTool = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<CharacterViews>(
    CharacterViews.Cards
  );

  const style = {
    button: {
      maxWidth: 148,
      flex: 1,
    },
  };

  return (
    <div className={classes.toolContainer}>
      <div className={classes.toolbar}>
        {currentView === CharacterViews.Cards && (
          <Button
            text={ToolbarButtons.NewCharacter}
            style={style.button}
            onClick={() => {
              setCurrentView(CharacterViews.Sheet);
            }}
          />
        )}

        {currentView === CharacterViews.Sheet && (
          <Button
            text={ToolbarButtons.Back}
            style={style.button}
            onClick={() => setCurrentView(CharacterViews.Cards)}
          />
        )}
      </div>
      {currentView === CharacterViews.Cards && <CharacterCards />}
      {currentView === CharacterViews.Sheet && <CharacterSheet />}
    </div>
  );
};

export default CharactersTool;
