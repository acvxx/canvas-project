import React, { useContext } from "react";
import { StyledButton } from "./style";
import CanvasContext from "../../contexts/CanvasContext";

export const CreateButton = (props) => {
  const { setSelectedShapes, setMode, setSelected, setShapeType, setNodes } =
    useContext(CanvasContext);
  const { shapeType } = props;

  return (
    <StyledButton
      onClick={() => {
        setShapeType(shapeType);
        setMode("draw");
        setSelectedShapes([]);
        setSelected(false);
        setNodes([]);
      }}
    >
      {shapeType}
    </StyledButton>
  );
};
