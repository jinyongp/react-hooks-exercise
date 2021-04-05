import { useEffect } from "react";

const useBeforeLeave = (onLeave) => {
  useEffect(() => {
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);
};

export default useBeforeLeave;
