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
  const { isDrawing, shapes, selectedShapeId, nodesArray } =
    useContext(CanvasContext);
  const viewProps = (nodesArray) => {
    if (nodesArray.length == 0) {
      return;
    }
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
          : nodesArray.length == 1
          ? JSON.stringify(shapes[selectedShapeId])
          : "여러 도형이 선택됐어요."}
      </h2>
    </div>
  );
};

export default View;
