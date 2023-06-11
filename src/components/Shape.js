import React, { useRef, useState } from "react";
import { Rect, Circle, Ellipse, Line } from "react-konva";

const Shape = ({ shapeProps, isSelected, onSelect, onChange, onClick }) => {
  const shapeRef = React.useRef();
  if (shapeProps.type === "rectangle") {
    return (
      <Rect
        onClick={(event) => onSelect(event, shapeRef)}
        //onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        x={shapeProps.startX}
        y={shapeProps.startY}
        width={shapeProps.endX - shapeProps.startX}
        height={shapeProps.endY - shapeProps.startY}
        //const radius = Math.abs(end.x - start.x) / 2;
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
            startX: e.target.x(),
            startY: e.target.y(),
            // set minimal value
            endX: e.target.x() + Math.max(5, e.target.width() * scaleX),
            endY: e.target.y() + Math.max(e.target.height() * scaleY),
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
        x={(shapeProps.startX + shapeProps.endX) / 2}
        y={(shapeProps.startY + shapeProps.endY) / 2}
        radius={Math.abs(shapeProps.endX - shapeProps.startX) / 2}
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
        x={(shapeProps.startX + shapeProps.endX) / 2}
        y={(shapeProps.startY + shapeProps.endY) / 2}
        radiusX={Math.abs(shapeProps.endX - shapeProps.startX) / 2}
        radiusY={Math.abs(shapeProps.endY - shapeProps.startY) / 2}
        name="rectangle"
        draggable={isSelected}
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
  if (shapeProps.type == "line") {
    return (
      <Line
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        ref={shapeRef}
        {...shapeProps}
        points={[
          shapeProps.startX,
          shapeProps.startY,
          shapeProps.endX,
          shapeProps.endY,
        ]}
        name="line"
        draggable={isSelected}
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
            width: e.target.width() * scaleX,
            height: e.target.height() * scaleY,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    );
  }
};
export default Shape;
