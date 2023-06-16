import { createContext, useState } from "react";

const CanvasContext = createContext();
export const CanvasProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]); //
  const [selectedShapes, setSelectedShapes] = useState([]); //
  const [isSelected, setSelected] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false); //
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [shapeType, setShapeType] = useState(""); //
  const [nodesArray, setNodes] = useState([]);
  const [redraw, setRedraw] = useState(false);
  const canvasState = {
    shapes,
    setShapes,
    selectedShapes,
    setSelectedShapes,
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
  };
  return (
    <CanvasContext.Provider value={canvasState}>
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContext;
