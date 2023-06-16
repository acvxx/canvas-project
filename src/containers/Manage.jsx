import React, { useContext } from "react";
import CanvasContext from "../contexts/CanvasContext";
import { CreateButton } from "../components/button/CreateButton";
import { FeatureButton } from "../components/button/FeatureButton";

const Manage = () => {
  const { shapes, setShapes, selectedShapes, setSelectedShapes, nodesArray } =
    useContext(CanvasContext);

  const shapeDown = () => {
    if (selectedShapes.length !== 1) return;
    const newShapes = [...shapes]; // 기존 배열을 복사하여 새로운 배열 생성
    const element = newShapes.splice(selectedShapes[0], 1)[0]; // 해당 요소를 배열에서 제거하고 가져옴
    newShapes.unshift(element); // 가져온 요소를 배열의 맨 앞으로 추가
    setShapes(newShapes);
    setSelectedShapes([0]);
  };

  const shapeUp = () => {
    console.log(shapes);
    console.log(nodesArray);
    if (selectedShapes.length !== 1) return;
    const newShapes = [...shapes]; // 기존 배열을 복사하여 새로운 배열 생성
    const element = newShapes.splice(selectedShapes[0], 1)[0]; // 해당 요소를 배열에서 제거하고 가져옴
    newShapes.push(element); // 가져온 요소를 배열의 맨 뒤로 추가
    setShapes(newShapes);
    console.log(newShapes);
    setSelectedShapes([newShapes.length - 1]);
  };

  const isSelected = (shape, index) => {
    return selectedShapes.some((id) => id === index);
  };

  const handleDeleteShape = () => {
    setShapes((prevShapes) =>
      prevShapes.filter((shape, index) => !isSelected(shape, index))
    );
    setSelectedShapes([]);
  };

  return (
    <div
      id="manage"
      style={{
        width: "200px",
        paddingTop: "50px",
        float: "left",
        background: "gray",
        flex: "none",
        box: "border-box",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>도형 생성</h1>
      <CreateButton shapeType="rectangle" />
      <CreateButton shapeType="circle" />
      <CreateButton shapeType="ellipse" />
      <CreateButton shapeType="line" />
      <CreateButton shapeType="text" />
      <h1 style={{ textAlign: "center" }}>도형 조정</h1>
      <FeatureButton feature={shapeUp} text="위로" />
      <FeatureButton feature={shapeDown} text="아래로" />
      <FeatureButton feature={handleDeleteShape} text="삭제" />
    </div>
  );
};
export default Manage;
