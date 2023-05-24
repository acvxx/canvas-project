import React, { useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Transformer,
  Line,
  Ellipse,
} from "react-konva";

const Canvas = () => {
  const stageRef = useRef();
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("white");
  const [shapeType, setShapeType] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.evt;
    setEndPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    console.log(selectedShapeId);
    if (!isDrawing && selectedShapeId !== null) {
      console.log(isDrawing, selectedShapeId);
      const x = endPoint.x - startPoint.x;
      const y = endPoint.y - startPoint.y;
      const shape1 = shapes[selectedShapeId];

      const updatedShape = {
        type: shape1.type,
        start: { x: shape1.start.x + x, y: shape1.start.y + y },
        end: { x: shape1.end.x + x, y: shape1.end.y + y },
        fill: "red",
        stroke: "black",
      };
      updateShape(selectedShapeId, updatedShape);
      return;
    } else if (!isDrawing) return;
    setIsDrawing(false);
    const shape = {
      type: shapeType, // 원하는 도형 타입 설정
      start: { ...startPoint },
      end: { ...endPoint },
      fill: color,
      stroke: "black",
    };
    setShapes([...shapes, shape]);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeClick = (event, id, shape) => {
    event.cancelBubble = true;
    setSelectedShapeId(id);
    const updatedShape = {
      type: shape.type,
      start: { x: shape.start.x, y: shape.start.y },
      end: { x: shape.end.x, y: shape.end.y },
      fill: "blue",
      stroke: "black",
    };
    updateShape(id, updatedShape);
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

  const updateShape = (index, updatedShape) => {
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = updatedShape;
      return updatedShapes;
    });
  };

  return (
    <div>
      <h6>
        {isDrawing ? "그림을 그리고 있어요" : "그림을 그리지 않고 있어요."}
      </h6>
      <h2>
        {selectedShapeId == null
          ? "선택된 도형이 없어요."
          : JSON.stringify(shapes[selectedShapeId])}
      </h2>
      <br></br>
      <button
        onClick={() => {
          setShapeType("rectangle");
          setIsDrawing(true);
          setColor("white");
        }}
      >
        사각형
      </button>
      <button
        onClick={() => {
          setShapeType("circle");
          setIsDrawing(true);
          setColor("white");
        }}
      >
        원
      </button>
      <button
        onClick={() => {
          setShapeType("ellipse");
          setIsDrawing(true);
          setColor("white");
        }}
      >
        타원
      </button>
      <button
        onClick={() => {
          setShapeType("line");
          setIsDrawing(true);
          setColor("white");
        }}
      >
        직선
      </button>
      <button
        onClick={() => {
          setShapeType("");
          setIsDrawing(false);
          setColor("white");
        }}
      >
        도형 선택하기
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        stroke={"Black"}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleStageClick}
      >
        <Layer>
          {shapes.map((shape, index) => {
            const { start, end } = shape;
            const width = Math.abs(end.x - start.x);
            const height = Math.abs(end.y - start.y);
            const fill = shape.fill;
            const radius = Math.abs(end.x - start.x) / 2;
            if (shape.type === "rectangle") {
              return (
                <Rect
                  key={index}
                  x={start.x}
                  y={start.y}
                  width={width}
                  height={height}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    handleShapeClick(event, index, shape);
                  }}
                  //onUpdate={(updatedShape) => updateShape(index, updatedShape)}
                  //draggable
                />
              );
            }
            if (shape.type === "circle") {
              return (
                <Circle
                  key={index}
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2}
                  radius={radius}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    handleShapeClick(event, index, shape);
                  }}
                  //draggable
                />
              );
            }
            if (shape.type === "ellipse") {
              return (
                <Ellipse
                  key={index}
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2}
                  radiusX={width / 2}
                  radiusY={height / 2}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    handleShapeClick(event, index, shape);
                  }}
                  //draggable
                />
              );
            }
            if (shape.type === "line") {
              return (
                <Line
                  key={index}
                  points={[start.x, start.y, end.x, end.y]}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    handleShapeClick(event, index, shape);
                  }}
                  //draggable
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
