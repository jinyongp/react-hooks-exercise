import { useState } from "react";

export const useInput = (initial, validator = () => true) => {
  const [value, setValue] = useState(initial);
  const onChange = (event) => {
    const {
      target: { value: currentValue },
    } = event;
    if (validator(currentValue)) {
      setValue(currentValue);
    }
  };
  return { value, onChange };
};
