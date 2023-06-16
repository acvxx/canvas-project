import React, { useContext } from "react";
import { ColorProperty } from "./property/ColorProperty";
import { NumberProperty } from "./property/NumberProperty";
import { RangeProperty } from "./property/RangeProperty";
import { TextProperty } from "./property/TextProperty";
import CanvasContext from "../contexts/CanvasContext";

const View = () => {
  const { shapes, selectedShapes } = useContext(CanvasContext);

  const viewProps = (shape) => {
    if (shape.type === "text") {
      return (
        <div class="property">
          <ColorProperty property="fill" />
          <TextProperty property="text" />
        </div>
      );
    } else {
      return (
        <div class="property">
          <ColorProperty property="fill" />
          <ColorProperty property="stroke" />
          <NumberProperty property="strokeWidth" />
          <RangeProperty property="opacity" max={1} step={0.1} />
          <RangeProperty property="shadowBlur" max={100} step={1} />
          <NumberProperty property="width" />
          <NumberProperty property="height" />
        </div>
      );
    }
  };

  return (
    <div
      style={{
        width: "400px",
        paddingTop: "50px",
        paddingLeft: "10px",
        float: "left",
        background: "lightgray",
        height: "100vh",
      }}
    >
      <h1>
        {selectedShapes.length === 0
          ? "도형을 선택해 주세요!"
          : selectedShapes.length > 1
          ? "여러 도형이 선택됐어요."
          : viewProps(shapes[selectedShapes[0]])}
      </h1>
    </div>
  );
};

export default View;
