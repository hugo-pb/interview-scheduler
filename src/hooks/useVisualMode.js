import { useState } from "react";

/**
 * @description Custom hook to manage the current mode
 * @param {*} initial Initial visual mode
 * @returns Object with mode and fucntions to change mode
 */

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    setMode(nextMode);
    if (replace) {
      const newArr = [...history];
      newArr[newArr.length - 1] = nextMode;
      setHistory(newArr);
    } else {
      setHistory((prev) => [...prev, nextMode]);
    }
  };

  const back = (cars) => {
    if (history.length > 1) {
      setMode(history.at(-2));
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
