import { fetcher } from "../index";
import { envConfig } from "@/env";
import { LoginFields } from "@/types/login";

export async function login({
  login,
  password,
}: LoginFields): Promise<any> {
  return await fetcher("POST", envConfig.server.loginUrl, {
    username: login,
    password: password,
  });
}
