// Types

import { GameObject, GameObjectTypes } from "../context/GameObjectContext";

// Assets

import grass from "../assets/grass.png";

const defaultGroundImages: string[] = [grass];

const allImages: string[] = [...defaultGroundImages];

export const useDefaultObjects = (): GameObject[] => {
  const defaultObjects: GameObject[] = [];

  allImages.forEach((image, index) => {
    defaultObjects.push({
      id: index,
      type: defaultGroundImages.includes(image)
        ? GameObjectTypes.Ground
        : GameObjectTypes.Character,
      image,
    });
  });

  return defaultObjects;
};
