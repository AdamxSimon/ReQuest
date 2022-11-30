// Components

import CharacterManagementTool from "./tools/character-management-tool/CharacterManagementTool";

// Styles

import classes from "./styles.module.css";

const App = (): JSX.Element => {
  return (
    <div className={classes.app}>
      <CharacterManagementTool />
    </div>
  );
};

export default App;
