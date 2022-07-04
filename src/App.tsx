// React

import { useState } from "react";

// Custom Components

import NavigationBar from "./components/NavigationBar/NavigationBar";
import CharactersTool from "./components/CharactersTool/CharactersTool";
import CombatTool from "./components/CombatTool/CombatTool";

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
    <div className="App">
      <NavigationBar setCurrentTool={setCurrentTool} />
      {currentTool === Tools.Characters && <CharactersTool />}
      {currentTool === Tools.Combat && <CombatTool />}
    </div>
  );
};
