import React, { useContext, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Transformer,
  Line,
  Ellipse,
} from "react-konva";
import Shape from "./Shape";
import CanvasContext from "../CanvasContext";

const View = () => {
  const { shapes, selectedShapeId, nodesArray } = useContext(CanvasContext);
  const viewProps = (shape) => {
    return JSON.stringify(shape);
  };
  return (
    <div
      style={{
        width: "300px",
        float: "left",
        background: "lightgray",
        height: "100vh",
      }}
    >
      <h2>
        {selectedShapeId == null
          ? "선택된 도형이 없어요."
          : nodesArray.length > 1
          ? "여러 도형이 선택됐어요."
          : viewProps(shapes[selectedShapeId])}
      </h2>
    </div>
  );
};

export default View;
