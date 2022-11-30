// React

import ReactDOM from "react-dom/client";

// Context

import { CharactersProvider } from "./context/CharactersContext";

// Components

import App from "./App";

// Styles

import "./index.css";

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CharactersProvider>
    <App />
  </CharactersProvider>
);
