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
import Shape from "./Shape";

const Canvas = () => {
  const stageRef = useRef();
  const trRef = useRef();
  const shapeRef = useRef();
  const layerRef = useRef();

  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("white");
  const [shapeType, setShapeType] = useState("");
  const [nodesArray, setNodes] = useState([]);
  React.useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        trRef.current.nodes(nodesArray);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [isSelected]);

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
    console.log(e);
    if (e.target === e.target.getStage()) {
      console.log("stage");
      setSelected(false);
      setSelectedShapeId(null);
      //console.log("handleStageClick");
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
    console.log("toggleSelection");
    setNodes([...nodesArray, node]);
    console.log("1" + nodesArray);
    trRef.current.getLayer().batchDraw();
    trRef.current.nodes(nodesArray);
    layerRef.current.batchDraw();
    console.log("2" + nodesArray);
    setSelected(true);
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
        <Layer ref={layerRef}>
          {shapes.map((shape, index) => {
            console.log(shape);
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
                <Line
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
                />
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
