import { useState } from "react";

export default function UseVisualMode(initial) {
  const [mode, setmode] = useState(initial);
  return { mode };
}
