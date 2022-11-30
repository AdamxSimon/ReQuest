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
}

const charactersSaveData: string | null = localStorage.getItem("characters");

const initialCharactersState: Character[] = charactersSaveData
  ? JSON.parse(charactersSaveData)
  : [];

export const CharactersContext = createContext<CharactersContextState>({
  characters: [],
  setCharacters: () => {},
  saveCharacter: () => {},
} as CharactersContextState);

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

  const value: CharactersContextState = useMemo(() => {
    return { characters, setCharacters, saveCharacter };
  }, [characters, saveCharacter]);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
