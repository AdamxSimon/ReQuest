// Styles

import classes from "./styles.module.css";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps): JSX.Element => {
  const { placeholder, value, onChange } = props;

  return (
    <input
      className={classes.textInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
