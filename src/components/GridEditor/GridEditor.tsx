// React

import React, {
  useRef,
  useEffect,
  MouseEventHandler,
  ChangeEvent,
} from "react";

// Custom Components

import Button from "../Button/Button";

// Interfaces

import { LoadedImage } from "../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

enum ToolbarButtons {
  ExitEraseMode = "Exit Erase Mode",
  EnterEraseMode = "Enter Erase Mode",
  SetHeight = "Set Height",
  SetWidth = "Set Width",
}

interface GridEditorProps {
  images: LoadedImage[];
  spriteSize: number;
  selectSprite: MouseEventHandler<HTMLCanvasElement>;
  inEraseMode: boolean;
  toggleEraseMode: () => void;
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
    if (gridHeightRef.current?.value) {
      const newHeight: number = +gridHeightRef.current.value;
      props.setGridHeight(newHeight);
      gridHeightRef.current.value = "";
    }
  };

  const setWidthHandler = (): void => {
    if (gridWidthRef.current?.value) {
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

  const blockStrings = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");
    event.target.value = result;
  };

  const style = {
    button: {
      width: 148,
      maxWidth: 148,
      flex: 1,
    },
  };

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
        <Button
          text={ToolbarButtons.ExitEraseMode}
          style={style.button}
          onClick={props.toggleEraseMode}
        />
      ) : (
        <Button
          text={ToolbarButtons.EnterEraseMode}
          style={style.button}
          onClick={props.toggleEraseMode}
        />
      )}
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridHeightRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${props.gridHeight}`}
          onChange={blockStrings}
        ></input>
        <Button
          text={ToolbarButtons.SetHeight}
          style={style.button}
          onClick={setHeightHandler}
        />
      </div>
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridWidthRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${props.gridWidth}`}
          onChange={blockStrings}
        ></input>
        <Button
          text={ToolbarButtons.SetWidth}
          style={style.button}
          onClick={setWidthHandler}
        />
      </div>
    </div>
  );
};

export default GridEditor;
