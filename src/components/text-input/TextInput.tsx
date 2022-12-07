// React

import { useContext } from "react";

// Context

import { ScreenSizeContext } from "../../context/ScreenSizeContext";

// Styles

import classes from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps): JSX.Element => {
  const { placeholder, value, onChange } = props;

  const { isSmallScreen } = useContext(ScreenSizeContext);

  return (
    <input
      className={classes.textInput}
      style={isSmallScreen ? { flex: 1 } : undefined}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
