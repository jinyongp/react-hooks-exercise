import { useState, useEffect } from "react";

const useTitle = (initial) => {
  const [title, setTitle] = useState(initial);
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.textContent = title;
  }, [title]);
  return setTitle;
};

export default useTitle;
