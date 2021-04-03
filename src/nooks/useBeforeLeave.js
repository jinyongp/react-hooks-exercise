import { useEffect } from "react";

export const useBeforeLeave = (onLeave) => {
  useEffect(() => {
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);
};
