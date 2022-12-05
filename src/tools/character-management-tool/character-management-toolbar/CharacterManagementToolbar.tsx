// Styles

import { useCallback, useContext, useRef } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import classes from "./styles.module.css";

interface CharacterManagementToolbarProps {
  buttons: React.ReactElement[];
}

const CharacterManagementToolbar = (
  props: CharacterManagementToolbarProps
): JSX.Element => {
  const { buttons } = props;

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
      <div className={classes.leftButtonsContainer}>
        {buttons.map((button) => button)}
      </div>

      <div className={classes.settingsContainer}>
        <a
          className={classes.settingsButton}
          href={charactersDataRef}
          download={"characters.json"}
        >
          {"Download"}
        </a>

        <div className={classes.settingsButton} onClick={handleUpload}>
          {"Upload"}
        </div>

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
    </div>
  );
};

export default CharacterManagementToolbar;
