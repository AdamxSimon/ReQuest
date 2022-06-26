// React

import { useState, useEffect } from "react";

// Images

import grass from "../assets/grass.png";
import person from "../assets/person.png";

interface Image {
  id: string;
  src: string;
}

const images: Image[] = [
  { id: "grass", src: grass },
  { id: "person", src: person },
];

const useLoadImages = () => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = (image: Image) => {
      return new Promise((resolve, reject) => {
        const loadingImage: HTMLImageElement = new Image();
        loadingImage.src = image.src;

        loadingImage.onload = () => {
          setTimeout(() => {
            resolve(loadingImage);
          }, 2000);
        };

        loadingImage.onerror = (err) => reject(err);
      });
    };

    Promise.all(images.map((image) => loadImage(image)))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return { imagesLoaded };
};

export default useLoadImages;
