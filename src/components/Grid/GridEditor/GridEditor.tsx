// Interfaces

import { LoadedImage } from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

interface GridEditorProps {
  images: LoadedImage[];
}

const GridEditor = (props: GridEditorProps): JSX.Element => {
  return (
    <div className={classes.gridEditorContainer}>
      <canvas className={classes.spritePicker} height={16} width={64}></canvas>
    </div>
  );
};

export default GridEditor;
