import { useContext } from "react";
import CanvasContext from "../../contexts/CanvasContext";
import { StyledButton } from "./style";

export const FeatureButton = (props) => {
  const { setRedraw } = useContext(CanvasContext);
  const { feature, text } = props;

  return (
    <StyledButton
      onClick={() => {
        feature();
        setRedraw(true);
      }}
    >
      {text}
    </StyledButton>
  );
};
