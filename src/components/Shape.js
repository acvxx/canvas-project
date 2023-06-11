import React, { useRef, useState } from "react";
import { Rect, Circle, Ellipse, Line, Text } from "react-konva";

const Shape = ({ shapeProps, isSelected, onSelect, onChange, onClick }) => {
  const shapeRef = React.useRef();
  if (shapeProps.type === "rectangle") {
    return (
      <Rect
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        name="rectangle"
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const scaleX = e.target.scaleX();
          const scaleY = e.target.scaleY();

          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
            // set minimal value
            width: Math.max(e.target.width() * scaleX),
            height: Math.max(e.target.height() * scaleY),
          });
        }}
      />
    );
  }
  if (shapeProps.type === "circle") {
    return (
      <Circle
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        x={shapeProps.x + shapeProps.width / 2}
        y={shapeProps.y + shapeProps.height / 2}
        radius={shapeProps.width / 2}
        name="circle"
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x() - shapeProps.width / 2,
            y: e.target.y() - shapeProps.height / 2,
          });
        }}
        onTransformEnd={(e) => {
          const scaleX = e.target.scaleX();
          const scaleY = e.target.scaleY();
          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            width: e.target.width() * scaleX,
            height: e.target.height() * scaleY,
            x: e.target.x() - (e.target.width() * scaleX) / 2,
            y: e.target.y() - (e.target.height() * scaleY) / 2,
          });
        }}
      />
    );
  }
  if (shapeProps.type === "ellipse") {
    return (
      <Ellipse
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        x={shapeProps.x + shapeProps.width / 2}
        y={shapeProps.y + shapeProps.height / 2}
        radiusX={shapeProps.width / 2}
        radiusY={shapeProps.height / 2}
        name="rectangle"
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x() - shapeProps.width / 2,
            y: e.target.y() - shapeProps.height / 2,
          });
        }}
        onTransformEnd={(e) => {
          const scaleX = e.target.scaleX();
          const scaleY = e.target.scaleY();

          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            width: e.target.width() * scaleX,
            height: e.target.height() * scaleY,
            x: e.target.x() - (e.target.width() * scaleX) / 2,
            y: e.target.y() - (e.target.height() * scaleY) / 2,
          });
        }}
      />
    );
  }
  if (shapeProps.type == "line") {
    return (
      <Line
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        points={[0, 0, shapeProps.width, shapeProps.height]}
        fill={shapeProps.fill}
        stroke={shapeProps.stroke}
        name="line"
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const scaleX = e.target.scaleX();
          const scaleY = e.target.scaleY();
          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            width: e.target.width() * scaleX,
            height: e.target.height() * scaleY,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    );
  }
  if (shapeProps.type == "text") {
    return (
      <Text
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
        text={shapeProps.text || "텍스트를 입력하세요."}
        fill={shapeProps.fill || "black"}
        fontSize={50}
        name="text"
        draggable={isSelected}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const scaleX = e.target.scaleX();
          const scaleY = e.target.scaleY();
          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    );
  }
};
export default Shape;
