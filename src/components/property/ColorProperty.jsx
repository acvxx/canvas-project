import React from "react";
import { StyledDiv, StyledInput, StyledLabel } from "./style";
import useChange from "../../hooks/useChange";

export const ColorProperty = (props) => {
  const { property } = props;
  const { shape, handleChange } = useChange();
  return (
    <StyledDiv>
      <StyledLabel>{property}</StyledLabel>
      <StyledInput
        type="color"
        value={shape[property]}
        placeholder={shape[property]}
        onInput={(event) => handleChange(event, property)}
      />
    </StyledDiv>
  );
};
