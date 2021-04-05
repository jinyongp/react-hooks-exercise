import { useEffect, useRef } from "react";

const useHover = (onHover) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.addEventListener("mouseenter", onHover);
    return () => ref.current?.removeEventListener("mouseenter", onHover);
  }, []);
  return ref;
};

export default useHover;
