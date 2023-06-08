import React, { useRef, useState } from "react";
import { Rect, Circle, Ellipse } from "react-konva";

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
        draggable
        onDragEnd={(e) => {
          console.log(e.target);
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
            width: Math.max(5, e.target.width() * scaleX),
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
        // ref={shapeRef.current[getKey]}
        ref={shapeRef}
        {...shapeProps}
        radius={shapeProps.width / 2}
        x={shapeProps.x + shapeProps.width / 2}
        y={shapeProps.y + shapeProps.height / 2}
        name="circle"
        draggable
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

          // we will reset it back
          e.target.scaleX(1);
          e.target.scaleY(1);
          onChange({
            ...shapeProps,
            x: e.target.x() - (e.target.width() * scaleX) / 2,
            y: e.target.y() - (e.target.height() * scaleY) / 2,
            // set minimal value
            width: e.target.width() * scaleX,
            height: e.target.height() * scaleY,
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
        draggable
        onDragEnd={(e) => {
          console.log(e.target);
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
};
export default Shape;
