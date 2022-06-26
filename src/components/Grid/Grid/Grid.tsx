// React

import { useRef, useState, useEffect } from "react";
import { LoadedImage } from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

interface GridProps {
  spriteSize: number;
  tileSize: number;
  selectedSprite: HTMLImageElement | undefined;
}

const Grid = (props: GridProps): JSX.Element => {
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [height, setHeight] = useState<number>(1);
  const [width, setWidth] = useState<number>(1);

  const tileSize: number = 16;
  const gridScale: number = 4;

  useEffect((): void => {
    if (gridRef.current) {
      gridContextRef.current = gridRef.current.getContext("2d");
    }
  }, []);

  return (
    <div className={classes.gridContainer}>
      <canvas
        className={classes.grid}
        ref={gridRef}
        height={height * tileSize}
        width={width * tileSize}
        style={{
          height: height * tileSize * gridScale,
          width: width * tileSize * gridScale,
        }}
      ></canvas>
    </div>
  );
};

export default Grid;
