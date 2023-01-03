// React

import ReactDOM from "react-dom/client";

// Context

import CharactersProvider from "./context/CharactersContext";
import ModalProvider from "./context/ModalContext";
import ScreenSizeProvider from "./context/ScreenSizeContext";
import SpellsProvider from "./context/SpellsContext";

// Components

import App from "./App";

// Styles

import "./index.css";

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ScreenSizeProvider>
    <ModalProvider>
      <SpellsProvider>
        <CharactersProvider>
          <App />
        </CharactersProvider>
      </SpellsProvider>
    </ModalProvider>
  </ScreenSizeProvider>
);
