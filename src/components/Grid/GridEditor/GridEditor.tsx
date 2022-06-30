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
  gridHeight: number;
  setGridHeight: React.Dispatch<React.SetStateAction<number>>;
  gridWidth: number;
  setGridWidth: React.Dispatch<React.SetStateAction<number>>;
}

const GridEditor = (props: GridEditorProps): JSX.Element => {
  const spritePickerRef = useRef<HTMLCanvasElement | null>(null);
  const spritePickerContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridHeightRef = useRef<HTMLInputElement | null>(null);
  const gridWidthRef = useRef<HTMLInputElement | null>(null);

  const loadSprites = (): void => {
    props.images.forEach((image, index) => {
      spritePickerContextRef.current?.drawImage(
        image.img,
        index * props.spriteSize,
        0
      );
    });
  };

  const setHeightHandler = (): void => {
    if (gridHeightRef.current !== null) {
      const newHeight: number = +gridHeightRef.current.value;
      props.setGridHeight(newHeight);
      gridHeightRef.current.value = "";
    }
  };

  const setWidthHandler = (): void => {
    if (gridWidthRef.current !== null) {
      const newWidth: number = +gridWidthRef.current.value;
      props.setGridWidth(newWidth);
      gridWidthRef.current.value = "";
    }
  };

  useEffect((): void => {
    if (spritePickerRef.current) {
      spritePickerContextRef.current = spritePickerRef.current.getContext("2d");
      loadSprites();
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
        <div
          className={classes.button}
          style={{ backgroundColor: "pink" }}
          onClick={props.toggleEraseMode}
        >
          Exit Erase Mode
        </div>
      ) : (
        <div
          className={classes.button}
          style={{ backgroundColor: "pink" }}
          onClick={props.toggleEraseMode}
        >
          Enter Erase Mode
        </div>
      )}
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridHeightRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${props.gridHeight}`}
        ></input>
        <div
          className={classes.button}
          style={{ backgroundColor: "lightgreen" }}
          onClick={setHeightHandler}
        >
          Set Height
        </div>
      </div>
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridWidthRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${props.gridWidth}`}
        ></input>
        <div
          className={classes.button}
          style={{ backgroundColor: "lightgreen" }}
          onClick={setWidthHandler}
        >
          Set Width
        </div>
      </div>
    </div>
  );
};

export default GridEditor;
