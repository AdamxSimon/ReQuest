// React

import { useCallback, useContext, useRef } from "react";

// Context

import { CharactersContext } from "../../../context/CharactersContext";

// Assets

import DownArrowPNG from "../../../assets/down-arrow.png";

// Styles

import classes from "./styles.module.css";

interface CharacterManagementToolbarProps {
  buttons: React.ReactElement[];
  shouldHideSettings: boolean;
}

const CharacterManagementToolbar = (
  props: CharacterManagementToolbarProps
): JSX.Element => {
  const { buttons, shouldHideSettings } = props;

  const { charactersDataRef, uploadCharacterData } =
    useContext(CharactersContext);

  const uploadCharactersRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = useCallback((): void => {
    if (uploadCharactersRef.current) {
      uploadCharactersRef.current.click();
    }
  }, []);

  return (
    <div className={classes.toolbar}>
      <div className={classes.buttonsContainer}>
        {buttons.map((button) => button)}
      </div>

      {!shouldHideSettings && (
        <div className={classes.settingsContainer}>
          <img
            src={DownArrowPNG}
            alt={"Upload"}
            height={24}
            style={{ transform: "rotate(180deg)" }}
            onClick={handleUpload}
          />

          <a href={charactersDataRef} download={"characters.json"}>
            <img src={DownArrowPNG} alt={"Download"} height={24} />
          </a>

          <input
            ref={uploadCharactersRef}
            style={{ display: "none" }}
            type={"file"}
            accept={".json"}
            onChange={async () => {
              if (uploadCharactersRef?.current?.files) {
                const file: File = uploadCharactersRef.current.files[0];
                const fileText: string = await file.text();
                const characterData = JSON.parse(fileText);
                uploadCharacterData(characterData);
                uploadCharactersRef.current.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterManagementToolbar;
