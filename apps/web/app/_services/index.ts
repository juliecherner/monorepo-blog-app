import { Method, CustomResponse } from "@/types/fetcher";
import { extractToken } from "@/services/token";

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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, options).then(async (res) => {
    let data = await handleResponse(res.json());
    return {
      ok: res.ok,
      data,
    };
  });
};

async function handleResponse(promise: Promise<any>) {
  try {
    return await promise;
  } catch {
    return {};
  }
}
