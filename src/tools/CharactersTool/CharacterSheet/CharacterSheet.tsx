// Custom Components

import TextInput from "../../../components/TextInput/TextInput";
import AttributeContainer from "../../../components/AttributeContainer/AttributeContainer";

// Styles

import classes from "./styles.module.css";

enum Headers {
  BasicInfo = "Basic Info",
  Attributes = "Attributes",
}

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
      <div className={classes.header}>{Headers.BasicInfo}</div>
      <div className={classes.section}>
        {Object.values(TextFields).map((textField, index) => {
          return (
            <TextInput
              key={index}
              style={{ flex: 1 }}
              placeholder={textField}
              onChange={(event) => {
                localStorage.setItem(`${textField}`, event.target.value);
              }}
            ></TextInput>
          );
        })}
      </div>
      <div className={classes.header} style={{ marginTop: "16px" }}>
        {Headers.Attributes}
      </div>
      <div className={classes.section}>
        <AttributeContainer />
      </div>
    </div>
  );
};

export default CharacterSheet;
