// React

import ReactDOM from "react-dom/client";

// Custom Components

import App from "./App";

// Styles

import "./index.css";

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
