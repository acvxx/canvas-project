import React, { useRef, useState } from "react";
import { Rect, Circle } from "react-konva";

const Shape = ({ shapeProps, isSelected, onSelect, onChange, onClick }) => {
  const shapeRef = React.useRef();
  if (shapeProps.type === "rectangle") {
    return (
      <Rect
        onClick={(event) => onSelect(event, shapeRef)}
        onTap={(event) => onSelect(event, shapeRef)}
        // ref={shapeRef.current[getKey]}
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
          console.log(shapeRef.current);

          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current.attrs;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
    );
  }
  if (shapeProps.type === "circle") {
    return (
      <Circle
        onClick={() => onSelect(shapeRef)}
        onTap={() => onSelect(shapeRef)}
        // ref={shapeRef.current[getKey]}
        ref={shapeRef}
        {...shapeProps}
        name="circle"
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
    );
  }
};
export default Shape;
