// React

import { useState } from "react";

// Context

import { GameObjectProvider } from "./context/GameObjectContext";
import { CharactersProvider } from "./context/CharactersContext";
import { CharactersToolProvider } from "./context/CharactersToolContext";
import { CombatToolProvider } from "./context/CombatToolContext";

// Custom Components

import NavigationBar from "./components/NavigationBar/NavigationBar";
import CharactersTool from "./tools/CharactersTool/CharactersTool";
import CombatTool from "./tools/CombatTool/CombatTool";

// Styles

import "./App.css";

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
      <GameObjectProvider>
        <div className="App">
          <NavigationBar setCurrentTool={setCurrentTool} />
          {currentTool === Tools.Characters && (
            <CharactersToolProvider>
              <CharactersTool />
            </CharactersToolProvider>
          )}
          {currentTool === Tools.Combat && (
            <CombatToolProvider>
              <CombatTool />
            </CombatToolProvider>
          )}
        </div>
      </GameObjectProvider>
    </CharactersProvider>
  );
};
