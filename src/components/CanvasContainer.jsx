import React, { useContext, useRef } from "react";
import CanvasContext from "../contexts/CanvasContext";
import CanvasView from "./CanvasView";

const CanvasContainer = () => {
  const trRef = useRef();
  const layerRef = useRef();
  const {
    shapes,
    setShapes,
    selectedShapes,
    setSelectedShapes,
    isDrawing,
    setIsDrawing,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    shapeType,
    nodesArray,
    setNodes,
    redraw,
    setRedraw,
  } = useContext(CanvasContext);

  React.useEffect(() => {
    if (nodesArray.length !== 0 || selectedShapes.length !== 0) {
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
  }, [selectedShapes, redraw, nodesArray, setRedraw]);

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
    console.log(shapeType);
    const shapeProps = {
      type: shapeType,
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
      width: Math.abs(endPoint.x - startPoint.x),
      height: Math.abs(endPoint.y - startPoint.y),
      stroke: "black",
      strokeWidth: 5,
      shadowBlur: 0,
      angle: 0,
      opacity: 1,
    };
    setShapes([...shapes, shapeProps]);
    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeClick = (event, e, index) => {
    let temp;
    let temp_id;
    if (event.evt.ctrlKey) {
      if (e.current !== undefined) {
        temp = nodesArray;
        temp_id = selectedShapes;
        if (!nodesArray.includes(e.current)) {
          temp.push(e.current);
          temp_id.push(index);
        } else {
          temp = temp.filter((item) => item !== e.current);
          temp_id = temp_id.filter((item) => item !== index);
        }
      }
    } else {
      event.cancelBubble = true;
      if (e.current !== undefined) {
        console.log("click됐어요!!!");
        temp = [];
        temp_id = [index];
        temp.push(e.current);
      }
    }
    setNodes(temp);
    setSelectedShapes(temp_id);
    console.log(temp_id);
    trRef.current.nodes(nodesArray);
    trRef.current.getLayer().batchDraw();
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedShapes([]);
      setNodes([]);
      trRef.current.nodes(nodesArray);
    }
  };

  return (
    <CanvasView
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      handleStageClick={handleStageClick}
      handleShapeClick={handleShapeClick}
      trRef={trRef}
      layerRef={layerRef}
      shapes={shapes}
      setShapes={setShapes}
      selectedShapes={selectedShapes}
    />
  );
};

export default CanvasContainer;
