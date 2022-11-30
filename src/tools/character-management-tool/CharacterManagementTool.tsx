// React

import { useCallback, useContext, useState } from "react";

// Context

import { CharactersContext } from "../../context/CharactersContext";

// Components

import Button from "../../components/button/Button";
import CharacterDetailsScreen from "./character-details-screen/CharacterDetailsScreen";
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

  console.log({ characterBeingEdited });

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
          onClick={() => saveCharacter(characterBeingEdited)}
        />,
      ]
    : [
        <Button
          key={"New Character"}
          text={"New Character"}
          onClick={() => {
            setCharacterBeingEdited(new Character({ id: characters.length }));
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
      <div className={classes.toolbar}>
        {toolbarButtons.map((button) => button)}
      </div>
      {currentView}
    </div>
  );
};

export default CharacterManagementTool;
