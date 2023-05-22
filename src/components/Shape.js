import React from "react";
import { Rect, Circle } from "react-konva";

const Shape = ({ shape, isSelected, onSelect, onDeselect }) => {
  const handleShapeClick = (event) => {
    event.cancelBubble = true; // 이벤트 버블링 방지
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  };

  return (
    <>
      {shape.type === "rectangle" && (
        <Rect
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          fill={isSelected ? "blue" : "red"}
          onClick={handleShapeClick}
        />
      )}
      {shape.type === "circle" && (
        <Circle
          x={shape.x}
          y={shape.y}
          radius={shape.radius}
          fill={isSelected ? "blue" : "red"}
          onClick={handleShapeClick}
        />
      )}
    </>
  );
};

export default Shape;
