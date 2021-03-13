import { useState } from "react";
import axios from "axios";

const initialRequestInfor = {
  error: null,
  data: null,
  loading: false,
};

export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfor);

  async function call(localConfig) {
    setRequestInfo({
      ...initialRequestInfor,
      loading: true,
    });

    let response = null;

    try {
      response = await axios({
        baseURL: "http://localhost:5000",
        ...config,
        ...localConfig,
      });
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
  }
  return [call, requestInfo];
}
