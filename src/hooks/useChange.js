import { useContext } from "react";
import CanvasContext from "../contexts/CanvasContext";

export default function useChange() {
  const { setShapes, shapes, selectedShapes, setRedraw } =
    useContext(CanvasContext);

  const shape = shapes[selectedShapes[0]];

  const handleChange = (event, property) => {
    let value = event.target.value;
    if (
      property === "opacity" ||
      property === "shadowBlur" ||
      property === "width" ||
      property === "height" ||
      property === "strokeWidth"
    ) {
      value = parseFloat(event.target.value);
    } //값을 숫자로 바꿔주어야 함

    const newAttrs = { ...shape, [property]: value };
    let shapeArray = shapes;
    shapeArray[selectedShapes[0]] = newAttrs;
    setShapes(shapeArray);
    setRedraw(true);
  };
  return {
    shape,
    handleChange,
  };
}
