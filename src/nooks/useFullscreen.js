import { useEffect, useRef } from "react";

const useFullscreen = (callback) => {
  const ref = useRef();
  const listener = () => callback?.(document.fullscreenElement);
  useEffect(() => {
    document.addEventListener("fullscreenchange", listener);
    return () => document.removeEventListener("fullscreenchange", listener);
  }, []);
  const enterFullscreen = () => {
    ref.current?.requestFullscreen?.() ||
      ref.current?.mozRequestFullscreen?.() ||
      ref.current?.webkitRequestFullscreen?.() ||
      ref.current?.msRequestFullscreen?.();
  };
  const exitFullscreen = () => {
    document.fullscreenElement &&
      (document.exitFullscreen?.() ||
        document.mozExitFullscreen?.() ||
        document.webKitExitFullscreen?.() ||
        document.msExitFullscreen?.());
  };
  return { ref, enterFullscreen, exitFullscreen };
};

export default useFullscreen;
