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
  const { setShapes, shapes, selectedShapeId, nodesArray, setRedraw } =
    useContext(CanvasContext);
  const handleChange = (event, shape, property) => {
    if (
      property == "opacity" ||
      property == "shadowBlur" ||
      property == "width" ||
      property == "height" ||
      property == "strokeWidth"
    ) {
      const newAttrs = { ...shape, [property]: parseFloat(event.target.value) };
      shapes[selectedShapeId] = newAttrs;
    } else {
      const newAttrs = { ...shape, [property]: event.target.value };
      shapes[selectedShapeId] = newAttrs;
      console.log(newAttrs);
    }
    console.log(shapes);
    setShapes(shapes);
    setRedraw(true);
  };

  const viewProps = (shape) => (
    <div class="property">
      <div id="fill">
        채우기
        <input
          type="color"
          value={shape.fill}
          placeholder={shape.fill}
          onInput={(event) => handleChange(event, shape, "fill")}
        />
      </div>
      {shape.type !== "text" && (
        <div>
          <div id="stroke">
            <label>외곽선:</label>
            <input
              type="color"
              value={shape.stroke}
              placeholder={shape.stroke}
              onInput={(event) => handleChange(event, shape, "stroke")}
            />
          </div>
          <div id="strokeWidth">
            <label>외곽선 굵기:</label>
            <input
              type="number"
              min={0}
              value={shape.strokeWidth}
              placeholder={shape.strokeWidth}
              onInput={(event) => handleChange(event, shape, "strokeWidth")}
            />
          </div>
          <div id="opacity">
            <label>투명도:</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={shape.opacity}
              placeholder={shape.opacity}
              onInput={(event) => handleChange(event, shape, "opacity")}
            />
          </div>
          <div id="shadowBlur">
            <label>그림자:</label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={shape.shadowBlur}
              placeholder={shape.shadowBlur}
              onInput={(event) => handleChange(event, shape, "shadowBlur")}
            />
          </div>
          <div id="Width">
            <label>Width:</label>
            <input
              type="number"
              min={0}
              value={shape.width}
              placeholder={shape.width}
              onInput={(event) => handleChange(event, shape, "width")}
            />
          </div>
          <div id="Height">
            <label>Height:</label>
            <input
              type="number"
              min={0}
              value={shape.height}
              placeholder={shape.height}
              onInput={(event) => handleChange(event, shape, "height")}
            />
          </div>
        </div>
      )}
      {shape.type === "text" && (
        <div id="text">
          <label>텍스트 내용:</label>
          <input
            type="text"
            value={shape.text}
            placeholder={shape.text}
            onChange={(event) => handleChange(event, shape, "text")}
          />
        </div>
      )}
    </div>
  );
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
