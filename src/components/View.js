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
  const { isDrawing, shapes, selectedShapeId } = useContext(CanvasContext);
  return (
    <div
      style={{
        width: "300px",
        float: "left",
        background: "lightgray",
        height: "100vh",
      }}
    >
      <h6>
        {isDrawing ? "그림을 그리고 있어요" : "그림을 그리지 않고 있어요."}
      </h6>
      <h2>
        {selectedShapeId == null
          ? "선택된 도형이 없어요."
          : JSON.stringify(shapes[selectedShapeId])}
      </h2>
    </div>
  );
};

export default View;
