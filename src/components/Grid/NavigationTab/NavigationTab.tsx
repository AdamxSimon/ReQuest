// Styles

import classes from "./styles.module.css";

interface NavigationTabProps {
  label: string;
}

const NavigationTab = (props: NavigationTabProps): JSX.Element => {
  const { label } = props;

  return <div className={classes.navigationTab}>{label}</div>;
};

export default NavigationTab;
