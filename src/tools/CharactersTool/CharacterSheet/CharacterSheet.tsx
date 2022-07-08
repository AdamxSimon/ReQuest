// Custom Components

import TextInput from "../../../components/TextInput/TextInput";

// Styles

import classes from "./styles.module.css";

enum TextFields {
  Name = "Name",
  Level = "Level",
  Class = "Class",
  Race = "Race",
  Age = "Age",
  Background = "Background",
  Alignment = "Alignment",
  Experience = "Experience",
}

const CharacterSheet = (): JSX.Element => {
  return (
    <div className={classes.characterSheet}>
      <div className={classes.infoContainer}>
        {Object.values(TextFields).map((textField, index) => {
          return (
            <TextInput
              key={index}
              flex
              placeholder={textField}
              onChange={(event) => {
                localStorage.setItem(`${textField}`, event.target.value);
              }}
            ></TextInput>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSheet;
