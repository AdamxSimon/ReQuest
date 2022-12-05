// React

import { useCallback, useContext, useState } from "react";

// Context

import { CharactersContext } from "../../context/CharactersContext";

// Components

import Button from "../../components/button/Button";
import CharacterDetailsScreen from "./character-details-screen/CharacterDetailsScreen";
import CharacterManagementToolbar from "./character-management-toolbar/CharacterManagementToolbar";
import CharactersOverviewScreen from "./characters-overview-screen/CharactersOverviewScreen";

// Types

import { Character } from "../../types/Character";

// Styles

import classes from "./styles.module.css";

const CharacterManagementTool = (): JSX.Element => {
  const { characters, setCharacters, saveCharacter } =
    useContext(CharactersContext);

  const [characterBeingEdited, setCharacterBeingEdited] =
    useState<Character | null>(null);

  const deleteCharacter = useCallback(() => {
    if (characterBeingEdited) {
      const newCharacterList = characters.filter(
        (character) => character.id !== characterBeingEdited.id
      );

      newCharacterList.forEach((character, index) => {
        character.id = index;
      });

      setCharacters(newCharacterList);
    }

    setCharacterBeingEdited(null);
  }, [
    characters,
    setCharacters,
    characterBeingEdited,
    setCharacterBeingEdited,
  ]);

  const toolbarButtons: JSX.Element[] = characterBeingEdited
    ? [
        <Button
          key={"Back"}
          text={"Back"}
          onClick={() => setCharacterBeingEdited(null)}
        />,
        <Button
          key={"Delete"}
          text={"Delete"}
          onClick={deleteCharacter}
          isDisabled={
            !characters.some(
              (character) => character.id === characterBeingEdited.id
            )
          }
        />,
        <Button
          key={"Save"}
          text={"Save"}
          onClick={() => {
            saveCharacter(characterBeingEdited);
            setCharacterBeingEdited(null);
          }}
        />,
      ]
    : [
        <Button
          key={"New Character"}
          text={"New Character"}
          onClick={() => {
            setCharacterBeingEdited(new Character({ id: Date.now() }));
          }}
        />,
      ];

  const currentView: JSX.Element = characterBeingEdited ? (
    <CharacterDetailsScreen
      characterBeingEdited={characterBeingEdited}
      setCharacterBeingEdited={setCharacterBeingEdited}
    />
  ) : (
    <CharactersOverviewScreen
      setCharacterBeingEdited={setCharacterBeingEdited}
    />
  );

  return (
    <div className={classes.toolContainer}>
      <CharacterManagementToolbar buttons={toolbarButtons} />
      {currentView}
    </div>
  );
};

export default CharacterManagementTool;
