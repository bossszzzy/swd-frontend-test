"use client";

import Controls from "@/components/test1/controller";
import ShapeGrid, { ShapeId, ShapeItem } from "@/components/test1/shape";
import { Divider, Layout } from "antd";
import React from "react";

const { Content } = Layout;


const SHAPES: ShapeId[] = [
  "circle",
  "ellipse",
  "square",
  "rectangle",
  "parallelogram",
  "trapezoid",
];

const ROWS = 2;
const COLS = 3;

function generateInitialPositions(): ShapeItem[] {
  const positions: ShapeItem[] = [];
  let idx = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const id = SHAPES[idx] as ShapeId;
      positions.push({ id, position: { row: r, col: c } });
      idx++;
    }
  }
  return positions;
}

function rotateLeft<T>(arr: T[]): T[] {
  return arr.length ? [...arr.slice(1), arr[0]] : arr;
}

function rotateRight<T>(arr: T[]): T[] {
  return arr.length ? [arr[arr.length - 1], ...arr.slice(0, -1)] : arr;
}


function shufflePositions(rows: number, cols: number) {
  const cells = Array.from({ length: rows * cols }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells.map((cell) => ({
    row: Math.floor(cell / cols),
    col: cell % cols,
  }));
}

export default function Page() {
  const [items, setItems] = React.useState<ShapeItem[]>(() =>
    generateInitialPositions()
  );
  const [flipped, setFlipped] = React.useState(false);

  const onMoveShapeLeft = () => {
    const ids = items.map((i) => i.id);
    const rotated = rotateLeft(ids);
    const next = items.map((it, idx) => ({
      ...it,
      id: rotated[idx],
    }));
    setItems(next);
  };
  const onMoveShapeRight = () => {
    const ids = items.map((i) => i.id);
    const rotated = rotateRight(ids);
    const next = items.map((it, idx) => ({
      ...it,
      id: rotated[idx],
    }));
    setItems(next);
  };

  const onMovePosition = () => setFlipped((prev) => !prev);

  const onRandomize = () => {
    const positions = shufflePositions(ROWS, COLS);
    setItems(items.map((it, idx) => ({ ...it, position: positions[idx] })));
  };

  const onReset = () => {
    setItems(generateInitialPositions());
    setFlipped(false);
  };

  return (
    <Content className="body">
      <Controls
        onMoveShapeLeft={onMoveShapeLeft}
        onMoveShapeRight={onMoveShapeRight}
        onMovePosition={onMovePosition}
        onReset={onReset}
      />
      <Divider />
      <ShapeGrid
        items={items}
        onShapeClick={onRandomize}
        flipped={flipped}
        rows={ROWS}
        cols={COLS}
      />
    </Content>
  );
}
