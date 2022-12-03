// Styles

import classes from "./styles.module.css";

interface CharacterManagementToolbarProps {
  buttons: React.ReactElement[];
}

const CharacterManagementToolbar = (
  props: CharacterManagementToolbarProps
): JSX.Element => {
  const { buttons } = props;

  return (
    <div className={classes.toolbar}>
      <div className={classes.leftButtonsContainer}>
        {buttons.map((button) => button)}
      </div>
      <div></div>
    </div>
  );
};

export default CharacterManagementToolbar;
