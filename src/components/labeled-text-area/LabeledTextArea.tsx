// React

import { useMemo, useState } from "react";

// Assets

import DropdownArrowPNG from "../../assets/dropdown-arrow.png";

// Styles

import classes from "./styles.module.css";

interface LabeledTextAreaProps {
  label: string;
  value: string;
  isCollapsible?: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

const LabeledTextArea = (props: LabeledTextAreaProps): JSX.Element => {
  const { label, value, isCollapsible, onChange, style } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const labeledTextAreaStyle: React.CSSProperties = useMemo(
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
    <div className={classes.labeledTextArea} style={labeledTextAreaStyle}>
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

      {isCollapsible && !isCollapsed && (
        <textarea
          className={classes.value}
          style={style}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default LabeledTextArea;
