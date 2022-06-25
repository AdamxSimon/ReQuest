import { useRef, useState, useEffect } from "react";

// Styles

import classes from "./styles.module.css";

const Grid = (): JSX.Element => {
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const tileSize: number = 16;
  const gridScale: number = 4;

  useEffect((): void => {
    if (gridRef.current) {
      setHeight(1);
      setWidth(1);
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
