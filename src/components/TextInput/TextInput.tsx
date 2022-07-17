// Styles

import classes from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
  value: string;
  style?: {};
  onChange?: (event: any) => void;
}

const TextInput = (props: TextInputProps): JSX.Element => {
  const { style, placeholder, value, onChange } = props;

  return (
    <input
      className={classes.input}
      style={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
