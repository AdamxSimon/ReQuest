// Styles

import classes from "./styles.module.css";

interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { text, isDisabled, onClick } = props;

  return (
    <div
      className={classes.button}
      style={isDisabled ? { backgroundColor: "lightgray" } : undefined}
      onClick={isDisabled ? undefined : onClick}
    >
      {text}
    </div>
  );
};

export default Button;
