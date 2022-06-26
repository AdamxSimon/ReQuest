// React

import { useRef, useState, useEffect } from "react";

// Custom Hooks

import useLoadImages from "../../../hooks/useLoadImages";

// Styles

import classes from "./styles.module.css";

const Grid = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { imagesLoaded } = useLoadImages();

  useEffect(() => {
    if (imagesLoaded) {
      setIsLoaded(true);
    }
  }, [imagesLoaded]);

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
      {isLoaded ? (
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Grid;
