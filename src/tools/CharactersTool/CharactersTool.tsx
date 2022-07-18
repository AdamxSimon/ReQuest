// React

import { useCallback, useContext } from "react";

// Context

import { CharactersToolContext } from "../../context/CharactersToolContext";
import { CharactersContext } from "../../context/CharactersContext";

// Custom Components

import CharacterCards from "../../components/CharacterCards/CharacterCards";
import CharacterSheet from "../../components/CharacterSheet/CharacterSheet";
import Button from "../../components/Button/Button";

// Styles

import classes from "./styles.module.css";

enum ToolbarButtons {
  Back = "Back",
  NewCharacter = "New Character",
  Save = "Save",
}

const CharactersTool = (): JSX.Element => {
  const {
    isEditing,
    setIsEditing,
    selectedCharacter,
    selectedCharacterIndex,
    setSelectedCharacterIndex,
  } = useContext(CharactersToolContext);
  const { characters, setCharacters } = useContext(CharactersContext);

  const saveCharacter = useCallback(() => {
    const charactersCopy = [...characters];

    if (
      selectedCharacterIndex &&
      selectedCharacterIndex >= 0 &&
      selectedCharacter
    ) {
      charactersCopy.splice(selectedCharacterIndex, 1, selectedCharacter);
      setCharacters(charactersCopy);
    } else {
      if (selectedCharacter)
        setCharacters([...charactersCopy, selectedCharacter]);
    }

    setSelectedCharacterIndex(undefined);
  }, [
    characters,
    selectedCharacterIndex,
    selectedCharacter,
    setCharacters,
    setSelectedCharacterIndex,
  ]);

  const styles = {
    button: {
      maxWidth: 148,
      flex: 1,
    },
  };

  const toolbarButtons: JSX.Element[] = isEditing
    ? [
        <Button
          key={0}
          text={ToolbarButtons.Back}
          style={styles.button}
          onClick={
            selectedCharacter
              ? () => setSelectedCharacterIndex(undefined)
              : () => setIsEditing(false)
          }
        />,
        <Button
          key={1}
          text={ToolbarButtons.Save}
          style={styles.button}
          onClick={saveCharacter}
        />,
      ]
    : [
        <Button
          key={0}
          text={ToolbarButtons.NewCharacter}
          style={styles.button}
          onClick={() => {
            setIsEditing(true);
          }}
        />,
      ];

  const currentView: JSX.Element = isEditing ? (
    <CharacterSheet />
  ) : (
    <CharacterCards />
  );

  return (
    <div className={classes.toolContainer}>
      <div className={classes.toolbar}>
        {toolbarButtons.map((button) => button)}
      </div>
      {currentView}
    </div>
  );
};

export default CharactersTool;
