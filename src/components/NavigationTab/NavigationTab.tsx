// Styles

import classes from "./styles.module.css";

interface NavigationTabProps {
  label: string;
  setCurrentTool: () => void;
}

const NavigationTab = (props: NavigationTabProps): JSX.Element => {
  const { label, setCurrentTool } = props;

  return (
    <div className={classes.navigationTab} onClick={setCurrentTool}>
      {label}
    </div>
  );
};

export default NavigationTab;
