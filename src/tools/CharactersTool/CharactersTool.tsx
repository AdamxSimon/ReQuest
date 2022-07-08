// React

import { useState } from "react";

// Custom Components

import CharacterCards from "./CharacterCards/CharacterCards";
import CharacterSheet from "./CharacterSheet/CharacterSheet";

// Styles

import classes from "./styles.module.css";

export enum CharacterViews {
  Cards,
  Sheet,
}

const CharactersTool = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<CharacterViews>(
    CharacterViews.Cards
  );

  return (
    <div className={classes.toolContainer}>
      <div className={classes.toolbar}>
        {currentView !== CharacterViews.Cards && (
          <div
            className={classes.button}
            onClick={() => setCurrentView(CharacterViews.Cards)}
          >
            Back
          </div>
        )}
        <div
          className={classes.button}
          onClick={() => {
            setCurrentView(CharacterViews.Sheet);
          }}
        >
          New Character
        </div>
      </div>
      {currentView === CharacterViews.Cards && <CharacterCards />}
      {currentView === CharacterViews.Sheet && <CharacterSheet />}
    </div>
  );
};

export default CharactersTool;
