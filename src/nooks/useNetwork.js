import { useEffect, useState } from "react";

const useNetwork = (onChange = () => {}) => {
  const [status, setStatus] = useState(navigator.onLine);
  const listener = () => {
    const { onLine } = navigator;
    setStatus(onLine);
    onChange(onLine);
  };
  useEffect(() => {
    ["online", "offline"].forEach((event) =>
      window.addEventListener(event, listener)
    );
    return () =>
      ["online", "offline"].forEach((event) =>
        window.removeEventListener(event, listener)
      );
  }, []);
  return status;
};

export default useNetwork;
