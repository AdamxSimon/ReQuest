// Styles

import classes from "./styles.module.css";

interface ButtonProps {
  text: string;
  style?: {};
  onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { text, style, onClick } = props;

  return (
    <div className={classes.button} style={style} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
