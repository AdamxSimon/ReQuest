// React

import { useContext } from "react";

// Context

import { ModalContext } from "../../context/ModalContext";
import { ScreenSizeContext } from "../../context/ScreenSizeContext";

// Styles

import classes from "./styles.module.css";

const ModalOverlay = (): JSX.Element | null => {
  const { currentModalComponent, dismissModal } = useContext(ModalContext);
  const { isSmallScreen } = useContext(ScreenSizeContext);

  if (!currentModalComponent) {
    return null;
  }

  if (isSmallScreen) {
    return (
      <div className={classes.modal} style={{ height: "100%", width: "100%" }}>
        {currentModalComponent}
      </div>
    );
  }

  return (
    <>
      <div className={classes.modalBackdrop}></div>
      <div className={classes.modalContainer} onClick={dismissModal}>
        <div
          className={classes.modal}
          style={{ borderRadius: 4, boxShadow: "0 0 8px gray" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {currentModalComponent}
        </div>
      </div>
    </>
  );
};

export default ModalOverlay;
