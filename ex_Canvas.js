import React, { useState } from "react";

const Canvas = () => {
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (selectedShapeIndex !== null) {
      const { clientX, clientY } = event;
      const { top, left } = event.target.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;
      handleShapeMove(selectedShapeIndex, offsetX, offsetY);
      return;
    }

    setDrawing(true);
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setEndPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    if (selectedShapeIndex !== null) {
      setSelectedShapeIndex(null);
      return;
    }
    setDrawing(false);
    const shape = {
      type: "circle",
      start: { ...startPoint },
      end: { ...endPoint },
    };
    setShapes([...shapes, shape]);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeMove = (index, offsetX, offsetY) => {
    const updatedShapes = [...shapes];
    const shape = updatedShapes[index];
    shape.start.x += offsetX;
    shape.end.x += offsetX;
    shape.start.y += offsetY;
    shape.end.y += offsetY;
    setShapes(updatedShapes);
  };

  const handleShapeClick = (index) => {
    setSelectedShapeIndex(index);
  };

  return (
    <div>
      <svg
        width="800"
        height="600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {shapes.map((shape, index) => {
          if (shape.type === "rectangle") {
            const { start, end } = shape;
            const width = end.x - start.x;
            const height = end.y - start.y;
            return (
              <rect
                key={index}
                x={start.x}
                y={start.y}
                width={width}
                height={height}
                fill="none"
                stroke="black"
                onMouseDown={() => handleShapeClick(index)}
                style={{ zIndex: 9999 }}
              />
            );
          }
          if (shape.type === "circle") {
            const { start, end } = shape;
            const radius = Math.abs(end.x - start.x) / 2;
            //Math.sqrt(
            // Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
            //);
            return (
              <circle
                key={index}
                cx={Math.abs(end.x + start.x) / 2}
                cy={Math.abs(end.y + start.y) / 2}
                r={radius}
                fill="none"
                stroke="black"
                onMouseDown={() => handleShapeClick(index)}
                style={{ zIndex: index === selectedShapeIndex ? 1 : 0 }}
              />
            );
          }
          // 다른 도형들에 대한 로직 추가
          return null;
        })}
      </svg>
    </div>
  );
};

export default ex_Canvas;

{
  isDrawing && (
    <Line
      points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
      stroke="black"
    />
  );
}
