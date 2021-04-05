import { useRef } from "react";

export const useFullscreen = () => {
  const ref = useRef();
  const enterFullscreen = () => ref.current?.requestFullscreen();
  const exitFullscreen = () => document.exitFullscreen();
  return { ref, enterFullscreen, exitFullscreen };
};
