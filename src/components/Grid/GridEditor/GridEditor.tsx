// React

import { useRef, useEffect } from "react";

// Interfaces

import { LoadedImage } from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

interface GridEditorProps {
  images: LoadedImage[];
  spriteSize: number;
}

const GridEditor = (props: GridEditorProps): JSX.Element => {
  const spritePickerRef = useRef<HTMLCanvasElement | null>(null);
  const spritePickerContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawSprites = (): void => {
    props.images.forEach((image, index) => {
      spritePickerContextRef.current?.drawImage(
        image.img,
        index * props.spriteSize,
        0
      );
    });
  };

  useEffect((): void => {
    if (spritePickerRef.current) {
      spritePickerContextRef.current = spritePickerRef.current.getContext("2d");
      drawSprites();
    }
  }, []);

  return (
    <div className={classes.gridEditorContainer}>
      <canvas
        className={classes.spritePicker}
        ref={spritePickerRef}
        height={16}
        width={64}
      ></canvas>
    </div>
  );
};

export default GridEditor;
