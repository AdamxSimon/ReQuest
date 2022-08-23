// React

import { createContext, useContext, useEffect, useState } from "react";
import { useDefaultObjects } from "../hooks/useDefaultObjects";
import { CharactersContext } from "./CharactersContext";

export enum GameObjectTypes {
  Ground = "Ground",
  Obstruction = "Obstruction",
  Character = "Character",
}

export interface GameObject {
  id: number;
  type:
    | GameObjectTypes.Ground
    | GameObjectTypes.Obstruction
    | GameObjectTypes.Character;
  position?: [x: number, y: number];
  image: string;
}

interface GameObjectContextState {
  gameObjects: GameObject[];
  setGameObjects: React.Dispatch<React.SetStateAction<GameObject[]>>;
}

export const GameObjectContext = createContext<GameObjectContextState>(
  {} as GameObjectContextState
);

interface GameObjectProviderProps {
  children: JSX.Element;
}

export const GameObjectProvider = ({
  children,
}: GameObjectProviderProps): JSX.Element => {
  const defaultObjects = useDefaultObjects();

  const { characters } = useContext(CharactersContext);

  const [gameObjects, setGameObjects] = useState<GameObject[]>(defaultObjects);

  useEffect(() => {
    const defaultObjectsCopy: GameObject[] = [...defaultObjects];

    for (let character of characters) {
      defaultObjectsCopy.push({
        id: defaultObjectsCopy.length,
        type: GameObjectTypes.Character,
        position: undefined,
        image: character.image,
      });
    }

    setGameObjects(defaultObjectsCopy);
  }, [characters.length]);

  const value: GameObjectContextState = {
    gameObjects,
    setGameObjects,
  };

  return (
    <GameObjectContext.Provider value={value}>
      {children}
    </GameObjectContext.Provider>
  );
};
