import { useState } from "react";

export const useTabs = (initial, allTabs) => {
  const [index, setIndex] = useState(initial);
  return { content: allTabs[index], changeContent: setIndex };
};
