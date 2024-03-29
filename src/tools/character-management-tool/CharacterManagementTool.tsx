// React

import { useCallback, useContext, useMemo, useState } from "react";

// Context

import { CharactersContext } from "../../context/CharactersContext";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";

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
  const { isSmallScreen } = useContext(ScreenSizeContext);

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

  const toolbarButtons: JSX.Element[] = useMemo(
    () =>
      characterBeingEdited
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
          ],
    [characterBeingEdited, characters, deleteCharacter, saveCharacter]
  );

  const currentView: JSX.Element = useMemo(
    () =>
      characterBeingEdited ? (
        <CharacterDetailsScreen
          characterBeingEdited={characterBeingEdited}
          setCharacterBeingEdited={setCharacterBeingEdited}
        />
      ) : (
        <CharactersOverviewScreen
          setCharacterBeingEdited={setCharacterBeingEdited}
        />
      ),
    [characterBeingEdited]
  );

  return (
    <div
      className={classes.toolContainer}
      style={{ flexDirection: isSmallScreen ? "column-reverse" : "column" }}
    >
      <CharacterManagementToolbar
        buttons={toolbarButtons}
        shouldHideSettings={characterBeingEdited !== null}
      />
      {currentView}
    </div>
  );
};

export default CharacterManagementTool;
