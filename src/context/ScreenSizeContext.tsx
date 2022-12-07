// React

import { createContext, useEffect, useMemo, useState } from "react";

const SMALL_SCREEN_WIDTH = 420;

const UNSUPPORTED_SCREEN_WIDTH = 320;
const UNSUPPORTED_SCREEN_HEIGHT = 240;

interface ScreenSizeContextValue {
  isSmallScreen: boolean;
  isScreenUnsupported: boolean;
}

export const ScreenSizeContext: React.Context<ScreenSizeContextValue> =
  createContext<ScreenSizeContextValue>({
    isSmallScreen: false,
    isScreenUnsupported: false,
  });

interface ScreenSizeProviderProps {
  children: JSX.Element;
}

const ScreenSizeProvider = ({
  children,
}: ScreenSizeProviderProps): JSX.Element => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.screen.width <= SMALL_SCREEN_WIDTH
  );
  const [isScreenUnsupported, setIsScreenUnsupported] = useState<boolean>(
    window.screen.width <= UNSUPPORTED_SCREEN_WIDTH ||
      window.screen.height <= UNSUPPORTED_SCREEN_HEIGHT
  );

  useEffect((): void => {
    window.addEventListener("resize", () => {
      setIsSmallScreen(window.screen.width <= SMALL_SCREEN_WIDTH);
      setIsScreenUnsupported(
        window.screen.width <= UNSUPPORTED_SCREEN_WIDTH ||
          window.screen.height <= UNSUPPORTED_SCREEN_HEIGHT
      );
    });
  }, []);

  const value: ScreenSizeContextValue = useMemo(() => {
    return { isSmallScreen, isScreenUnsupported };
  }, [isSmallScreen, isScreenUnsupported]);

  return (
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeProvider;
