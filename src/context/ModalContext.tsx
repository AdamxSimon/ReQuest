// React

import React, { createContext, useCallback, useMemo, useState } from "react";

interface ModalContextValue {
  currentModalComponent?: JSX.Element;
  presentComponentAsModal: (component: JSX.Element) => void;
  dismissModal: () => void;
}

export const ModalContext: React.Context<ModalContextValue> =
  createContext<ModalContextValue>({
    currentModalComponent: undefined,
    presentComponentAsModal: () => {},
    dismissModal: () => {},
  });

interface ModalProviderProps {
  children: JSX.Element;
}

const ModalProvider = ({ children }: ModalProviderProps): JSX.Element => {
  const [currentModalComponent, setCurrentModalComponent] =
    useState<JSX.Element>();

  const presentComponentAsModal = useCallback(
    (component: JSX.Element): void => {
      setCurrentModalComponent(component);
    },
    []
  );

  const dismissModal = useCallback((): void => {
    setCurrentModalComponent(undefined);
  }, []);

  const value: ModalContextValue = useMemo(() => {
    return { currentModalComponent, presentComponentAsModal, dismissModal };
  }, [currentModalComponent, presentComponentAsModal, dismissModal]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
