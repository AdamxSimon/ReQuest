// React

import { useRef, ChangeEvent, useContext } from "react";
import { CombatToolContext } from "../../context/CombatToolContext";
import { GameObjectContext } from "../../context/GameObjectContext";

// Custom Components

import Button from "../Button/Button";

// Styles

import classes from "./styles.module.css";

enum ToolbarButtons {
  SetHeight = "Set Height",
  SetWidth = "Set Width",
}

const GridEditor = (): JSX.Element => {
  const gridHeightRef = useRef<HTMLInputElement | null>(null);
  const gridWidthRef = useRef<HTMLInputElement | null>(null);

  const { gameObjects } = useContext(GameObjectContext);
  const { grid, setGrid, selectedObject, setSelectedObject } =
    useContext(CombatToolContext);

  const blockStrings = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");
    event.target.value = result;
  };

  console.log(selectedObject);

  return (
    <div className={classes.gridEditorContainer}>
      <div className={classes.spritePickerContainer}>
        {gameObjects.map((gameObject) => {
          return (
            <img
              key={gameObject.id}
              src={gameObject.image}
              alt={gameObject.image}
              height={64}
              width={64}
              style={{ imageRendering: "pixelated", cursor: "pointer" }}
              onClick={() => {
                setSelectedObject(gameObject);
              }}
            />
          );
        })}
      </div>
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridHeightRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${grid.height}`}
          onChange={blockStrings}
        ></input>
        <Button
          text={ToolbarButtons.SetHeight}
          style={style.button}
          onClick={() => {
            gridHeightRef.current &&
              setGrid({ ...grid, height: +gridHeightRef.current.value });
          }}
        />
      </div>
      <div className={classes.gridSizeContainer}>
        <input
          ref={gridWidthRef}
          className={classes.input}
          style={{ marginRight: 8 }}
          placeholder={`${grid.width}`}
          onChange={blockStrings}
        ></input>
        <Button
          text={ToolbarButtons.SetWidth}
          style={style.button}
          onClick={() => {
            gridWidthRef.current &&
              setGrid({ ...grid, width: +gridWidthRef.current.value });
          }}
        />
      </div>
    </div>
  );
};

const style = {
  button: {
    width: 148,
    maxWidth: 148,
    flex: 1,
  },
};

export default GridEditor;
