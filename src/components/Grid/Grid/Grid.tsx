// React

import { useRef, useEffect } from "react";

// Styles

import classes from "./styles.module.css";

interface GridProps {
  spriteSize: number;
  tileSize: number;
  selectedSprite: HTMLImageElement | undefined;
  inEraseMode: boolean;
  gridHeight: number;
  setGridHeight: React.Dispatch<React.SetStateAction<number>>;
  gridWidth: number;
}

const Grid = (props: GridProps): JSX.Element => {
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const gridContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const tileSize: number = 16;
  const gridScale: number = 4;

  const drawSelectedSprite = (event: any): void => {
    if (gridRef.current && gridContextRef.current) {
      const rectangle: DOMRect = gridRef.current.getBoundingClientRect();
      const x: number = event.clientX - rectangle.left;
      const y: number = event.clientY - rectangle.top;

      if (props.inEraseMode) {
        gridContextRef.current.clearRect(
          Math.floor(x / (tileSize * gridScale)) * tileSize,
          Math.floor(y / (tileSize * gridScale)) * tileSize,
          tileSize,
          tileSize
        );
      } else if (props.selectedSprite) {
        gridContextRef.current.drawImage(
          props.selectedSprite,
          Math.floor(x / (tileSize * gridScale)) * tileSize,
          Math.floor(y / (tileSize * gridScale)) * tileSize
        );
      }
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
        height={props.gridHeight * tileSize}
        width={props.gridWidth * tileSize}
        style={{
          height: props.gridHeight * tileSize * gridScale,
          width: props.gridWidth * tileSize * gridScale,
        }}
        onClick={drawSelectedSprite}
      ></canvas>
    </div>
  );
};

export default Grid;
