import { useEffect, useState } from "react";

const throttle = (func, wait) => {
  let trigger = true;
  return (...args) => {
    if (trigger) {
      trigger = false;
      setTimeout(() => {
        trigger = true;
      }, wait);
      func(...args);
    }
  };
};

const useScroll = () => {
  const [scroll, setScroll] = useState({ scrollX: 0, scrollY: 0 });
  const listener = () => {
    const { scrollX, scrollY } = window;
    setScroll({ scrollX, scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", throttle(listener, 300));
    return () => window.removeEventListener("scroll", throttle(listener, 300));
  }, []);
  return scroll;
};

export default useScroll;
