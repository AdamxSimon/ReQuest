// React

import { createContext, useState, useEffect, useContext } from "react";

// Import

import { Character } from "../types/Character";
import { CharactersContext } from "./CharactersContext";

interface CharactersToolContextState {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCharacter?: Character;
  selectedCharacterIndex?: number;
  setSelectedCharacterIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

export const CharactersToolContext = createContext<CharactersToolContextState>(
  {} as CharactersToolContextState
);

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersToolProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {
  const { characters } = useContext(CharactersContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<
    number | undefined
  >();

  const selectedCharacter: Character | undefined = selectedCharacterIndex
    ? characters[selectedCharacterIndex]
    : undefined;

  const value: CharactersToolContextState = {
    isEditing,
    setIsEditing,
    selectedCharacter,
    selectedCharacterIndex,
    setSelectedCharacterIndex,
  };

  useEffect(() => {
    setIsEditing(!!selectedCharacter);
  }, [selectedCharacter]);

  return (
    <CharactersToolContext.Provider value={value}>
      {children}
    </CharactersToolContext.Provider>
  );
};
