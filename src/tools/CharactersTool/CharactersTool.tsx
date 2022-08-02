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
import { Character } from "../../types/Character";

enum ToolbarButtons {
  Back = "Back",
  NewCharacter = "New Character",
  Save = "Save",
}

const CharactersTool = (): JSX.Element => {
  const {
    characterBeingEdited,
    setCharacterBeingEdited
  } = useContext(CharactersToolContext);
  const { characters, setCharacters } = useContext(CharactersContext);

  const saveCharacter = useCallback(() => {
    const charactersCopy = [...characters]
    if (
      characterBeingEdited && characterBeingEdited.id !== characters.length
    ) {
      charactersCopy.splice(characterBeingEdited.id, 1, characterBeingEdited);
      setCharacters(charactersCopy);
    } else if (characterBeingEdited) {
        setCharacters([...characters, characterBeingEdited]);
    }

    setCharacterBeingEdited(null);
  }, [
    characters,
    setCharacters,
    characterBeingEdited,
    setCharacterBeingEdited
  ]);

  const styles = {
    button: {
      maxWidth: 148,
      flex: 1,
    },
  };

  const toolbarButtons: JSX.Element[] = characterBeingEdited
    ? [
        <Button
          key={0}
          text={ToolbarButtons.Back}
          style={styles.button}
          onClick={
            () => setCharacterBeingEdited(null)
              
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
            setCharacterBeingEdited(new Character({id: characters.length}))}}
        />,
      ];

  const currentView: JSX.Element = characterBeingEdited ? (
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
