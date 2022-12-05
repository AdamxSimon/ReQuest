// React

import { useState } from "react";

// Styles

import classes from "./styles.module.css";

interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  onClick: () => void;
  backgroundColor?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { text, isDisabled, onClick, backgroundColor = "lightgreen" } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={classes.button}
      style={
        isDisabled
          ? { backgroundColor: "lightgray" }
          : isActive
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor }
      }
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={() => {
        setIsActive(true);
      }}
      onMouseUp={() => {
        setIsActive(false);
      }}
      onMouseOut={() => {
        setIsActive(false);
      }}
    >
      {text}
    </div>
  );
};

export default Button;
