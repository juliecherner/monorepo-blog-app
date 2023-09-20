import { Method, CustomResponse } from "@/types/fetcher";
import {extractToken} from "@/services/token"
export const fetcher = async (
  url: string,
  payload?: any,
  METHOD?: Method
): Promise<CustomResponse<any>> => {
  const token = extractToken();

  const options = {
    method: METHOD || "GET",
    ...(payload && { body: JSON.stringify(payload) }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
  };

  return fetch(url, options).then(async (res) => {
    return {
      ok: res.ok,
      data: await res.json(),
    };
  });
};

