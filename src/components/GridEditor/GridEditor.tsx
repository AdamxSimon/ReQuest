// React

import { useRef, ChangeEvent, useContext, useState } from "react";
import { CombatToolContext } from "../../context/CombatToolContext";
import {
  GameObjectContext,
  GameObjectTypes,
} from "../../context/GameObjectContext";

// Custom Components

import Button from "../Button/Button";
import PointsButton, { Buttons } from "../PointsButton/PointsButton";

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

  const [displayedObjects, setDisplayedObjects] = useState<GameObjectTypes>(
    GameObjectTypes.Ground
  );

  const filteredGameObjects = gameObjects.filter(
    (gameObject) => gameObject.type === displayedObjects
  );

  const blockStrings = (event: ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");
    event.target.value = result;
  };

  const changeDisplayedObjects = (type: Buttons) => {
    const options: GameObjectTypes[] = Object.values(GameObjectTypes);

    if (Buttons.Increment) {
      if (options.indexOf(displayedObjects) === options.length - 1) {
        setDisplayedObjects(options[0]);
      } else {
        setDisplayedObjects(options[options.indexOf(displayedObjects) + 1]);
      }
    } else if (Buttons.Decrement) {
      if (options.indexOf(displayedObjects) === 0) {
        setDisplayedObjects(options[options.length - 1]);
      } else {
        setDisplayedObjects(options[options.indexOf(displayedObjects) - 1]);
      }
    }
  };

  return (
    <div className={classes.gridEditorContainer}>
      <div className={classes.spritePickerContainer}>
        <div className={classes.spritePickerToggler}>
          <PointsButton
            type={Buttons.Decrement}
            onClick={() => changeDisplayedObjects(Buttons.Decrement)}
          />
          <div className={classes.spritePickerImages}>
            {filteredGameObjects.map((gameObject) => {
              return (
                <img
                  key={gameObject.id}
                  src={gameObject.image}
                  alt={gameObject.image}
                  height={54}
                  width={54}
                  style={{ imageRendering: "pixelated", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedObject(gameObject);
                  }}
                />
              );
            })}
          </div>
          <PointsButton
            type={Buttons.Increment}
            onClick={() => changeDisplayedObjects(Buttons.Increment)}
          />
        </div>
        <div className={classes.spritePickerCategory}>{displayedObjects}</div>
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
