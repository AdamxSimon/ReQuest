// React

import { useMemo, useState } from "react";

// Assets

import DropdownArrowPNG from "../../assets/dropdown-arrow.png";

// Styles

import classes from "./styles.module.css";

interface LabeledInputProps {
  label: string;
  value: string;
  isCollapsible?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

const LabeledInput = (props: LabeledInputProps): JSX.Element => {
  const { label, value, isCollapsible, onChange, style } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(!!isCollapsible);

  const labeledInputStyle: React.CSSProperties = useMemo(
    () =>
      isCollapsed
        ? {
            padding: 0,
            borderBottom: "none",
            borderRadius: 0,
            marginBottom: 8,
          }
        : { padding: 8 },
    [isCollapsed]
  );

  return (
    <div className={classes.labeledInput} style={labeledInputStyle}>
      <div
        className={classes.labelContainer}
        style={{ cursor: isCollapsible ? "pointer" : "default" }}
        onClick={isCollapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div>{label}</div>
        {isCollapsible && (
          <img
            src={DropdownArrowPNG}
            alt={isCollapsed ? "Expand" : "Collapse"}
            height={8}
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        )}
      </div>

      {!isCollapsed && (
        <input
          type="text"
          className={classes.value}
          style={style}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default LabeledInput;
