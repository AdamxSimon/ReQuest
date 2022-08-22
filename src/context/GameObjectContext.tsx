// React

import { createContext, useState } from "react";
import { useDefaultObjects } from "../hooks/useDefaultObjects";

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

  const [gameObjects, setGameObjects] = useState<GameObject[]>(defaultObjects);

  const value: GameObjectContextState = {
    gameObjects,
  };

  return (
    <GameObjectContext.Provider value={value}>
      {children}
    </GameObjectContext.Provider>
  );
};
