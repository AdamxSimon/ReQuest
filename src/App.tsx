// React

import { useState } from "react";

// Custom Components

import NavigationBar from "./components/NavigationBar/NavigationBar";
import CharactersTool from "./tools/CharactersTool/CharactersTool";
import CombatTool from "./tools/CombatTool/CombatTool";

// Styles

import "./App.css";
import { CharactersProvider } from "./context/CharactersContext";
import { CharactersToolProvider } from "./context/CharactersToolContext";

export enum Tools {
  Characters,
  Enemies,
  Items,
  Combat,
}

export const App = (): JSX.Element => {
  const [currentTool, setCurrentTool] = useState<Tools>(Tools.Characters);

  return (
    <CharactersProvider>
      <div className="App">
        <NavigationBar setCurrentTool={setCurrentTool} />
        {currentTool === Tools.Characters && (
          <CharactersToolProvider>
            <CharactersTool />
          </CharactersToolProvider>
        )}
        {currentTool === Tools.Combat && <CombatTool />}
      </div>
    </CharactersProvider>
  );
};
