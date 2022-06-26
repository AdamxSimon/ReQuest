// React

import { useRef, useState, useEffect } from "react";

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

  const [height, setHeight] = useState<number>(9);
  const [width, setWidth] = useState<number>(12);

  const tileSize: number = 16;
  const gridScale: number = 4;

  const drawSelectedSprite = (event: any): void => {
    if (props.selectedSprite && gridRef.current && gridContextRef.current) {
      const rectangle: DOMRect = gridRef.current.getBoundingClientRect();
      const x: number = event.clientX - rectangle.left;
      const y: number = event.clientY - rectangle.top;
      gridContextRef.current.drawImage(
        props.selectedSprite,
        Math.floor(x / (tileSize * gridScale)) * tileSize,
        Math.floor(y / (tileSize * gridScale)) * tileSize
      );
    }
  };

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
        onClick={drawSelectedSprite}
      ></canvas>
    </div>
  );
};

export default Grid;
