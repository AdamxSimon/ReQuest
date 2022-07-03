// Custom Components

import NavigationBar from "./components/Grid/NavigationBar/NavigationBar";
import CombatTool from "./components/Grid/CombatTool/CombatTool";

// Styles

import "./App.css";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <NavigationBar />
      <CombatTool />
    </div>
  );
};

export default App;
