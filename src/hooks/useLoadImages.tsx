// React

import { useState, useEffect } from "react";

// Images

import grass from "../assets/grass.png";
import person from "../assets/person.png";

interface Image {
  id: string;
  src: string;
}

export interface LoadedImage {
  id: string;
  img: HTMLImageElement;
}

const images: Image[] = [
  { id: "grass", src: grass },
  { id: "person", src: person },
];

const useLoadImages = () => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<LoadedImage[]>([]);

  useEffect(() => {
    const loadedImagesCopy = [...loadedImages];

    const loadImage = (image: Image) => {
      return new Promise((resolve, reject) => {
        const loadingImage: HTMLImageElement = new Image();
        loadingImage.src = image.src;

        loadingImage.onload = () => {
          setTimeout(() => {
            resolve(loadingImage);
          }, 2000);
          loadedImagesCopy.push({ id: image.id, img: loadingImage });
        };

        loadingImage.onerror = (err) => reject(err);
      });
    };

    Promise.all(images.map((image) => loadImage(image)))
      .then(() => {
        setImagesLoaded(true);
        setLoadedImages(loadedImagesCopy);
      })
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return { imagesLoaded, loadedImages };
};

export default useLoadImages;
