import { Method, CustomResponse } from "@/types/fetcher";

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

function extractToken(): string {
  return localStorage.getItem("token") || "";
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}
