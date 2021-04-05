import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (url, axiosInstance = axios) => {
  const [trigger, setTrigger] = useState(0);
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const refetch = () => {
    setState({ ...state, loading: true });
    setTrigger(Date.now());
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await axiosInstance(url);
        setState({ loading: false, data, error: null });
      } catch (error) {
        setState({ loading: false, data: null, error });
      }
    })();
  }, [trigger]);
  return [state, refetch];
};
