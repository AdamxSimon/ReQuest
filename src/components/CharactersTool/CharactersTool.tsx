// Custom Components

import CharacterManagement from "../CharacterManagement/CharacterManagement";

// Styles

import classes from "./styles.module.css";

const CharactersTool = (): JSX.Element => {
  return (
    <div className={classes.toolContainer}>
      <CharacterManagement />
    </div>
  );
};

export default CharactersTool;
