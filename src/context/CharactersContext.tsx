// React

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// Types

import { Character } from "../types/Character";

interface CharactersContextState {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  saveCharacter: (characterToSave: Character) => void;
  charactersDataRef: string;
  uploadCharacterData: (characterData: Character[]) => void;
}

const charactersSaveData: string | null = localStorage.getItem("characters");

const initialCharactersState: Character[] = charactersSaveData
  ? JSON.parse(charactersSaveData)
  : [];

export const CharactersContext = createContext<CharactersContextState>({
  characters: [],
  setCharacters: () => {},
  saveCharacter: () => {},
  charactersDataRef: "",
  uploadCharacterData: () => {},
});

interface CharactersProviderProps {
  children: JSX.Element;
}

export const CharactersProvider = ({
  children,
}: CharactersProviderProps): JSX.Element => {
  const [characters, setCharacters] = useState<Character[]>(
    initialCharactersState
  );

  const saveCharacter = useCallback(
    (characterToSave: Character): void => {
      const characterToSaveIndex: number = characters.findIndex(
        (characterFromState) => characterToSave.id === characterFromState.id
      );

      if (characterToSaveIndex === -1) {
        setCharacters([...characters, characterToSave]);
      } else {
        setCharacters(
          characters.map((characterFromState, index) => {
            if (index === characterToSaveIndex) {
              return characterToSave;
            } else {
              return characterFromState;
            }
          })
        );
      }
    },
    [characters]
  );

  const charactersDataRef: string = useMemo(() => {
    return (
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(characters))
    );
  }, [characters]);

  const uploadCharacterData = useCallback(
    (characterData: Character[]): void => {
      const uuids: number[] = characters.map((character) => character.id);
      const filteredData: Character[] =
        uuids.length > 0
          ? characterData.filter((character) => !uuids.includes(character.id))
          : characterData;
      const newCharactersState: Character[] = [...characters, ...filteredData];
      if (filteredData.length > 0) setCharacters(newCharactersState);
    },
    [characters]
  );

  const value: CharactersContextState = useMemo(() => {
    return {
      characters,
      setCharacters,
      saveCharacter,
      charactersDataRef,
      uploadCharacterData,
    };
  }, [characters, charactersDataRef, saveCharacter, uploadCharacterData]);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
