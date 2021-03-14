import { useRef } from "react";

export default function useDebouncePromise(functionDebunceAxios, delay) {
    let timeoutRef = useRef(null);
    

  function handler(...params) {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef = window.setTimeout(async () => {
        try {
          const response = await functionDebunceAxios(...params);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }

  return handler;
}
