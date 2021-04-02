import { useEffect, useRef } from "react";

export const useClick = (onClick) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.addEventListener("click", onClick);
    return () => ref.current?.removeEventListener("click", onClick);
  }, []);
  return ref;
};
