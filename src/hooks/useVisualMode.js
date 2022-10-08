import { useState, useEffect } from "react";

const UseVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second) => {
    setMode(second);
    setHistory((prev) => [...prev, second]);
  };

  const back = () => {
    if (history.length !== 1) {
      let newmode = history.at(-2);
      console.log(newmode);
      setMode(newmode);
      let newHistory = [...history];
      newHistory.pop();
      console.log("new;", newHistory);
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
};

export default UseVisualMode;
