// Styles

import classes from "./styles.module.css";

interface ButtonProps {
  text: string;
  style?: {};
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { text, style, disabled, onClick } = props;

  return (
    <div
      className={disabled ? classes.disabled : classes.button}
      style={style}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </div>
  );
};

export default Button;
