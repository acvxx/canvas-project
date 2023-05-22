import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Transformer, Line } from "react-konva";

const Canvas = () => {
  const stageRef = useRef();
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [shapeType, setShapeType] = useState("");

  const handleMouseDown = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.evt;
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.evt;
    setEndPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    //setIsDrawing(false);
    const shape = {
      type: shapeType, // 원하는 도형 타입 설정
      start: { ...startPoint },
      end: { ...endPoint },
    };
    setShapes([...shapes, shape]);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeClick = (event, id) => {
    event.cancelBubble = true;
    setSelectedShapeId(id);
  };

  const handleStageClick = () => {
    setSelectedShapeId(null);
  };

  const handleDeleteShape = () => {
    setShapes((prevShapes) =>
      prevShapes.filter((shape, index) => index !== selectedShapeId)
    );
    setSelectedShapeId(null);
  };

  return (
    <div>
      <button onClick={() => setIsDrawing(!isDrawing)}>
        {isDrawing ? "Stop Drawing" : "Start Drawing"}
      </button>
      <button onClick={() => setShapeType("rectangle")}>사각형</button>
      <button onClick={() => setShapeType("circle")}>원</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleStageClick}
      >
        <Layer>
          {shapes.map((shape, index) => {
            if (shape.type === "rectangle") {
              const { start, end } = shape;
              const width = end.x - start.x;
              const height = end.y - start.y;

              return (
                <Rect
                  key={index}
                  x={start.x}
                  y={start.y}
                  width={width}
                  height={height}
                  fill={index === selectedShapeId ? "blue" : "red"}
                  onClick={(event) => handleShapeClick(event, index)}
                  draggable
                />
              );
            }
            if (shape.type === "circle") {
              const { start, end } = shape;
              const radius = Math.abs(end.x - start.x) / 2;
              return (
                <Circle
                  key={index}
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2}
                  radius={radius}
                  fill={index === selectedShapeId ? "blue" : "red"}
                  onClick={(event) => handleShapeClick(event, index)}
                  draggable
                />
              );
            }

            return null;
          })}
        </Layer>
        <Layer></Layer>
      </Stage>
      <button onClick={handleDeleteShape}>Delete</button>
    </div>
  );
};

export default Canvas;
