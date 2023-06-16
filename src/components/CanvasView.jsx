import React, { useRef } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Shape from "./shape/Shape";

const CanvasView = (props) => {
  const shapeRef = useRef();
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleStageClick,
    handleShapeClick,
    trRef,
    layerRef,
    shapes,
    setShapes,
    selectedShapes,
  } = props;

  return (
    <div style={{ float: "left", position: "relative" }}>
      <Stage
        width={window.innerWidth - 700}
        height={window.innerHeight}
        stroke={"Black"}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleStageClick}
      >
        <Layer ref={layerRef}>
          {shapes.map((shape, index) => {
            const shapeProps = shape;
            return (
              <Shape
                key={index}
                shapeProps={shapeProps}
                ref={shapeRef}
                isSelected={selectedShapes.includes(index)}
                getLength={shapes.length}
                onSelect={(event, e) => handleShapeClick(event, e, index)}
                onChange={(newAttrs) => {
                  shapes[index] = newAttrs;
                  setShapes(shapes);
                }}
              />
            );
          })}

          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasView;
