export function extractToken(): string {
  return localStorage.getItem("token") || "";
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function extractUserId() {
  const token = extractToken();
  const parsedToken = parseJwt(token);
  if (!parsedToken) throw new Error("Token is not provided");
  return parsedToken._id;
}
