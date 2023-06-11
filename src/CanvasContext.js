import { createContext, useState } from "react";

const CanvasContext = createContext();
export const CanvasProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]); //
  const [selectedShapeId, setSelectedShapeId] = useState(null); //
  const [isSelected, setSelected] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false); //
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("white");
  const [shapeType, setShapeType] = useState(""); //
  const [nodesArray, setNodes] = useState([]);
  const [redraw, setRedraw] = useState(false);
  const canvasState = {
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
    color,
    setColor,
    shapeType,
    setShapeType,
    nodesArray,
    setNodes,
    redraw,
    setRedraw,
  };
  return (
    <CanvasContext.Provider value={canvasState}>
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContext;
