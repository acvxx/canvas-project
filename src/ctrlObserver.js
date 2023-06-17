import { useEffect, useState } from "react";

export const CtrlKeyObserver = () => {
  const [pressCtrl, setPressCtrl] = useState(false);

  const handleCtrlKeyPress = (event) => {
    const { key, keyCode } = event;

    if (keyCode === 17) {
      setPressCtrl(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCtrlKeyPress);

    return () => {
      window.removeEventListener("keydown", handlCtrlKeyPress);
    };
  });

  return pressCtrl;
};
