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

const Manage = () => {
  const shapeRef = useRef();
  const {
    setShapeType,
    setIsDrawing,
    shapes,
    setShapes,
    selectedShapeId,
    setSelectedShapeId,
    setRedraw,
  } = useContext(CanvasContext);

  const shapeDown = (selectedShapeId) => {
    if (selectedShapeId == null) return;
    const newArray = [...shapes]; // 기존 배열을 복사하여 새로운 배열 생성
    const element = newArray.splice(selectedShapeId, 1)[0]; // 해당 요소를 배열에서 제거하고 가져옴
    newArray.unshift(element); // 가져온 요소를 배열의 맨 앞으로 추가
    setShapes(newArray);
    setSelectedShapeId(0);
  };

  const shapeUp = (selectedShapeId) => {
    if (selectedShapeId == null) return;

    const newArray = [...shapes]; // 기존 배열을 복사하여 새로운 배열 생성
    const element = newArray.splice(selectedShapeId, 1)[0]; // 해당 요소를 배열에서 제거하고 가져옴
    newArray.push(element); // 가져온 요소를 배열의 맨 뒤로 추가
    setShapes(newArray);
    setSelectedShapeId(newArray.length - 1);
  };

  return (
    <div
      style={{
        width: "100px",
        float: "left",
        background: "gray",
        flex: "none",
        box: "border-box",
        height: "100vh",
      }}
    >
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          setShapeType("rectangle");
          setIsDrawing(true);
        }}
      >
        사각형
      </button>
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          setShapeType("circle");
          setIsDrawing(true);
        }}
      >
        원
      </button>
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          setShapeType("ellipse");
          setIsDrawing(true);
        }}
      >
        타원
      </button>
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          setShapeType("line");
          setIsDrawing(true);
        }}
      >
        직선
      </button>
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          shapeUp(selectedShapeId);
          setRedraw(true);
        }}
      >
        위로
      </button>
      <button
        style={{
          width: "90%",
          height: "80px",
          margin: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          shapeDown(selectedShapeId);
          setRedraw(true);
        }}
      >
        아래로
      </button>
    </div>
  );
};
export default Manage;
