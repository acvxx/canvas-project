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

const Canvas = () => {
  const stageRef = useRef();
  const trRef = useRef();
  const shapeRef = useRef();
  const layerRef = useRef();
  const {
    shapes,
    setShapes,
    selectedShapeId,
    setSelectedShapeId,
    isSelected,
    setSelected,
    isDrawing,
    setIsDrawing,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    shapeType,
    setShapeType,
    nodesArray,
    setNodes,
    redraw,
    setRedraw,
  } = useContext(CanvasContext);

  React.useEffect(() => {
    if (selectedShapeId != null) {
      if (trRef.current) {
        trRef.current.nodes(nodesArray);
        trRef.current.getLayer().batchDraw();
      }
    } else {
      trRef.current.nodes([]);
      trRef.current.getLayer().batchDraw();
    }
    if (redraw) {
      layerRef.current.batchDraw();
      setRedraw(false);
    }
  }, [selectedShapeId, redraw]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.evt;
    setEndPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const shapeProps = {
      type: shapeType,
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
      width: Math.abs(endPoint.x - startPoint.x),
      height: Math.abs(endPoint.y - startPoint.y),
      stroke: "black",
      strokeWidth: 5,
      shadowBlur: 0,
      opacity: 1,
    };
    setShapes([...shapes, shapeProps]);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeClick = (event, e, index) => {
    if (event.evt.ctrlKey) {
      if (e.current !== undefined) {
        let temp = nodesArray;
        if (!nodesArray.includes(e.current)) temp.push(e.current);
        else temp = temp.filter((item) => item !== e.current);
        setNodes(temp);
      }
    } else {
      event.cancelBubble = true;
      if (e.current !== undefined) {
        let temp = [];
        temp.push(e.current);
        setNodes(temp);
      }
    }
    setSelected(true);
    setSelectedShapeId(index);
    trRef.current.nodes(nodesArray);
    trRef.current.getLayer().batchDraw();
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelected(false);
      setSelectedShapeId(null);
      setNodes([]);
      trRef.current.nodes(nodesArray);
    }
  };

  return (
    <div style={{ float: "left", position: "relative" }}>
      <Stage
        width={window.innerWidth - 500}
        height={window.innerHeight}
        ref={stageRef}
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
                isSelected={index === selectedShapeId}
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

export default Canvas;
