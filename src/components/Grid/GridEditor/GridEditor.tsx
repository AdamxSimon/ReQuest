// React

import { useRef, useEffect, MouseEventHandler } from "react";

// Interfaces

import { LoadedImage } from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

interface GridEditorProps {
  images: LoadedImage[];
  spriteSize: number;
  selectSprite: MouseEventHandler<HTMLCanvasElement>;
  inEraseMode: boolean;
  toggleEraseMode: MouseEventHandler;
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
      <div className={classes.spritePickerContainer}>
        <canvas
          className={classes.spritePicker}
          ref={spritePickerRef}
          height={16}
          width={64}
          onClick={props.selectSprite}
        ></canvas>
      </div>
      {props.inEraseMode ? (
        <div className={classes.button} onClick={props.toggleEraseMode}>
          Exit Erase Mode
        </div>
      ) : (
        <div className={classes.button} onClick={props.toggleEraseMode}>
          Enter Erase Mode
        </div>
      )}
    </div>
  );
};

export default GridEditor;
