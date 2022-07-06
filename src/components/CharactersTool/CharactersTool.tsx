// Custom Components

import CharacterManagement from "../CharacterManagement/CharacterManagement";

// Styles

import classes from "./styles.module.css";

const CharactersTool = (): JSX.Element => {
  return (
    <div className={classes.toolContainer}>
      <div className={classes.toolbar}>
        <div className={classes.button}>New Character</div>
      </div>
      <CharacterManagement />
    </div>
  );
};

export default CharactersTool;
