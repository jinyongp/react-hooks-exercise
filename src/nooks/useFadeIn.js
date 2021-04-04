import { useEffect, useRef } from "react";

export const useFadeIn = ({
  duration = 1,
  timingFunction = "ease",
  delay = 0,
} = {}) => {
  const ref = useRef();
  useEffect(() => {
    const { current } = ref;
    // current.style.transition = `opacity ${duration}s ${timingFunction} ${delay}s`;
    current.style.transitionProperty = "opacity";
    current.style.transitionDuration = `${duration}s`;
    current.style.transitionTimingFunction = timingFunction;
    current.style.transitionDelay = `${delay}s`;
    current.style.opacity = 1;
  }, []);
  return { ref, style: { opacity: 0 } };
};
