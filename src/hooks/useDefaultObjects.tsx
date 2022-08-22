// Types

import { GameObject, GameObjectTypes } from "../context/GameObjectContext";

// Assets

import grass from "../assets/grass.png";
import person from "../assets/person.png";

const defaultGroundImages: string[] = [grass];
const defaultCharacterImages: string[] = [person];

const allImages: string[] = [...defaultGroundImages, ...defaultCharacterImages];

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
