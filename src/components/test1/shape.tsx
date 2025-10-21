"use client";
import React from "react";
import "../../app/test1.css";

export type ShapeId =
  | "circle"
  | "ellipse"
  | "square"
  | "rectangle"
  | "parallelogram"
  | "trapezoid";

export type ShapeItem = {
  id: ShapeId;
  position: { row: number; col: number };
};

type Props = {
  items: ShapeItem[];
  onShapeClick: () => void;
  flipped: boolean;
  rows: number;
  cols: number;
};

export default function Shape({ items, onShapeClick, flipped, rows }: Props) {
  return (
    <div className="grid">
      {items.map((item, idx) => {
        const row = flipped ? rows - 1 - item.position.row : item.position.row;
        const col = item.position.col;
        return (
            <div
              key={item.id + "-" + idx}
              className={`shape ${item.id}`}
              style={{
                gridRowStart: row + 1,
                gridColumnStart: col + 1,
              }}
              onClick={onShapeClick}
              role="button"
              aria-label={item.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onShapeClick();
              }}
            /> 
        );
      })}
    </div>
  );
}
