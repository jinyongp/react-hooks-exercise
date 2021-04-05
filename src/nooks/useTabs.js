import { useState } from "react";

const useTabs = (initial, allTabs) => {
  const [index, setIndex] = useState(initial);
  return { content: allTabs[index], changeContent: setIndex };
};

export default useTabs;
