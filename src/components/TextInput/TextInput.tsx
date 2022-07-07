// Styles

import classes from "./styles.module.css";

interface TextInputProps {
  width?: number;
  flex?: boolean;
  placeholder?: string;
  onChange?: (event: any) => void;
}

const TextInput = (props: TextInputProps) => {
  const { width, flex, placeholder, onChange } = props;

  return (
    <input
      className={classes.input}
      style={
        flex
          ? { flex: 1 }
          : width
          ? { width: `${width}px` }
          : { width: "fit-content" }
      }
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default TextInput;
