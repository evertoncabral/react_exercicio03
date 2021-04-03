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
      upDateRequestInfor: (newInfo) => newInfo,
      ...config,
      ...localConfig,
    };

    if (finalConfig.isFetchMore) {
      setRequestInfo({
        ...initialRequestInfor,
        data: requestInfo.data,
        loading: true,
      });
    } else if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfor,
        loading: true,
      });
    }

    const functionDebunceAxios = finalConfig.debounced ? debounceAxios : axios;

    try {
      response = await functionDebunceAxios(finalConfig);

      const newRequestInfo = {
        ...initialRequestInfor,
        data: response.data,
      };

      if (response.headers["x-total-count"] !== undefined) {
        newRequestInfo.total = Number.parseInt(
          response.headers["x-total-count"],
          10
        );
      }

      setRequestInfo(
        finalConfig.upDateRequestInfor(newRequestInfo, requestInfo)
      );
    } catch (error) {
      setRequestInfo(
        finalConfig.upDateRequestInfor(
          {
            ...initialRequestInfor,
            error,
          },
          requestInfo
        )
      );
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
    return response;
  }
  return [call, requestInfo];
}
