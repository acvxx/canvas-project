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
    color,
    setColor,
    shapeType,
    setShapeType,
    nodesArray,
    setNodes,
    redraw,
    setRedraw,
  } = useContext(CanvasContext);

  React.useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        trRef.current.nodes(nodesArray);
        trRef.current.getLayer().batchDraw();
      }
    }
    if (redraw) {
      layerRef.current.batchDraw();
      setRedraw(false);
    }
  }, [isSelected, redraw]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.evt;
    setEndPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    /*if (!isDrawing && selectedShapeId !== null) {
      const x = endPoint.x - startPoint.x;
      const y = endPoint.y - startPoint.y;
      const shape1 = shapes[selectedShapeId];

      const updatedShape = {
        type: shape1.type,
        start: { x: shape1.start.x + x, y: shape1.start.y + y },
        end: { x: shape1.end.x + x, y: shape1.end.y + y },
        fill: shape1.fill,
        stroke: shape1.stroke,
      };
      updateShape(selectedShapeId, updatedShape);
      return;
    } else*/
    if (!isDrawing) return;
    setIsDrawing(false);
    /*const shape = {
      type: shapeType, // 원하는 도형 타입 설정
      start: { ...startPoint },
      end: { ...endPoint },
      fill: color,
      stroke: "black",
    };
    setShapes([...shapes, shape]);*/
    const shapeProps = {
      type: shapeType,
      x: startPoint.x,
      y: startPoint.y,
      width: endPoint.x - startPoint.x,
      height: endPoint.y - startPoint.y,
      stroke: "black",
      fill: color,
    };
    setShapes([...shapes, shapeProps]);

    setStartPoint({ x: 0, y: 0 });
    setEndPoint({ x: 0, y: 0 });
  };

  const handleShapeClick = (event, e, index) => {
    setSelected(true);
    setSelectedShapeId(index);
    if (event.evt.ctrlKey) {
      if (e.current !== undefined) {
        let temp = nodesArray;
        if (!nodesArray.includes(e.current)) temp.push(e.current);
        setNodes(temp);
        trRef.current.nodes(nodesArray);
        trRef.current.getLayer().batchDraw();
      }
    } else {
      event.cancelBubble = true;
      if (e.current !== undefined) {
        let temp = [];
        temp.push(e.current);
        setNodes(temp);
        trRef.current.nodes(nodesArray);
        trRef.current.getLayer().batchDraw();
      }
    }
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelected(false);
      setSelectedShapeId(null);
      setNodes([]);
      trRef.current.nodes(nodesArray);
    }
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

  const toggleSelection = (node) => {
    var isSelected = nodesArray.includes(node);
    setNodes([...nodesArray, node]);
    console.log("1" + nodesArray);
    trRef.current.getLayer().batchDraw();
    trRef.current.nodes(nodesArray);
    layerRef.current.batchDraw();
    console.log("2" + nodesArray);
    setSelected(true);
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
            const type = shapeType;
            //const width = Math.abs(end.x - start.x);
            //const height = Math.abs(end.y - start.y);
            const fill = shape.fill;
            //const radius = Math.abs(end.x - start.x) / 2;
            const shapeProps = shape;
            /*{
              type: type,
              x: start.x,
              y: start.y,
              width: width,
              height: height,
              stroke: "black",
              fill: fill,
            };*/
            //setShapes([...shapes, shapeProps]);

            if (shape.type === "rectangle") {
              return (
                <Shape
                  key={index}
                  shapeProps={shapeProps}
                  ref={shapeRef}
                  isSelected={index === selectedShapeId}
                  getLength={shapes.length}
                  /*onSelect={(e) => {
                    if (e.current !== undefined) {
                      let temp = nodesArray;
                      if (!nodesArray.includes(e.current)) temp.push(e.current);
                      setNodes(temp);
                      trRef.current.nodes(nodesArray);
                      trRef.current.nodes(nodesArray);
                      trRef.current.getLayer().batchDraw();
                    }
                    setSelectedShapeId(index);
                  }}*/
                  onSelect={(event, e) => handleShapeClick(event, e, index)}
                  onChange={(newAttrs) => {
                    shapes[index] = newAttrs;
                    setShapes(shapes);
                  }}

                  //onUpdate={(updatedShape) => updateShape(index, updatedShape)}
                />
              );
            }
            if (shape.type === "circle") {
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
                  //onUpdate={(updatedShape) => updateShape(index, updatedShape)}
                />
              );
              /*<Circle
                  key={index}
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2}
                  radius={radius}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    if (event.evt.ctrlKey) {
                      toggleSelection(event.current);
                      console.log("ctrl 눌렸다.");
                    } else handleShapeClick(event, index, shape);
                  }}
                  draggable
                />
              );*/
            }
            if (shape.type === "ellipse") {
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
                  //onUpdate={(updatedShape) => updateShape(index, updatedShape)}
                />
              );
              /*<Ellipse
                  key={index}
                  //x={(start.x + end.x) / 2}
                  //y={(start.y + end.y) / 2}
                  //radiusX={width / 2}
                  //radiusY={height / 2}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    if (window.event.ctrlKey) {
                      toggleSelection(event.current);
                    } else handleShapeClick(event, index, shape);
                  }}
                  draggable
                />
              );*/
            }
            if (shape.type === "line") {
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
                /*<Line
                  key={index}
                  //points={[start.x, start.y, end.x, end.y]}
                  stroke={"black"}
                  fill={fill}
                  onClick={(event) => {
                    if (window.event.ctrlKey) {
                      toggleSelection(index, shape);
                    } else handleShapeClick(event, index, shape);
                  }}
                  draggable
                />*/
              );
            }
          })}

          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
      <button onClick={handleDeleteShape}>Delete</button>
    </div>
  );
};

export default Canvas;
