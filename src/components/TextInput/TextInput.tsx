// Styles

import classes from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
  style?: {};
  onChange?: (event: any) => void;
}

const TextInput = (props: TextInputProps) => {
  const { style, placeholder, onChange } = props;

  return (
    <input
      className={classes.input}
      style={style}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
