import { useState } from "react";
import axios from "axios";
import useDebouncePromise from "./useDebouncePromise";

const initialRequestInfor = {
  error: null,
  data: null,
  loading: false,
};

export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfor);

  const debounceAxios = useDebouncePromise(axios, config.debounceDelay);

  async function call(localConfig) {
    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:5000",
      ...config,
      ...localConfig,
    };
    if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfor,
        loading: true,
      });
    }

    const functionDebunceAxios = finalConfig.debounced ? debounceAxios : axios;

    try {
      response = await functionDebunceAxios(finalConfig);
      setRequestInfo({
        ...initialRequestInfor,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfor,
        error,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
    return response;
  }
  return [call, requestInfo];
}
