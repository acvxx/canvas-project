import React from "react";
import { StyledDiv, StyledInput, StyledLabel } from "./style";
import useChange from "../../hooks/useChange";

export const RangeProperty = (props) => {
  const { property, max, step } = props;
  const { shape, handleChange } = useChange();
  return (
    <StyledDiv>
      <StyledLabel>{property}</StyledLabel>
      <StyledInput
        type="range"
        min={0}
        max={max}
        step={step}
        value={shape[property]}
        placeholder={shape[property]}
        onInput={(event) => handleChange(event, property)}
      />
    </StyledDiv>
  );
};
