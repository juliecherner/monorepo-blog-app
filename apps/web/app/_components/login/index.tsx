"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomError from "@/components/customError";
import { login } from "@/services/login";
import { createErrorMessageForServer } from "@/services/error";
import { setToken } from "@/services/index";
import { CustomResponse, LoginResponse, ServerAppError } from "@/types/fetcher";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formSubmit = async (data: any) => {
    const response = await login(data);
    handleLoginResponse(response);
  };

  function handleLoginResponse(response: CustomResponse<LoginResponse>) {
    if (!response.ok) {
      const error = response?.data as ServerAppError;
      const message = createErrorMessageForServer(error);

      setErrorMessage(message);
      return;
    }

    router.push("/posts");

    setToken((response?.data as LoginResponse).access_token);
    if (errorMessage) setErrorMessage("");
    reset();
  }

  return (
    <main className="min-h-screen mt-44">
      {errorMessage && (
        <CustomError
          errorMessage={errorMessage}
          buttonText="Close"
          action={() => setErrorMessage("")}
        />
      )}
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="font-bold text-center text-lg">Please, login</div>

        <div className="h-28 w-96 flex flex-col gap-2">
          <label htmlFor="login">Login</label>

          <input
            id="login"
            type="text"
            {...register("login", { required: true })}
            placeholder="Enter login"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          {errors.login && (
            <p className="text-red-600 font-bold">Valid email is required.</p>
          )}
        </div>

        <div className="h-28 w-96 flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Enter password"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          {errors.password && (
            <p className="text-red-600 font-bold">
              Password of minimum 8 symbols is required.
            </p>
          )}
        </div>

        <input
          className="w-96 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Log in"
        />
      </form>
    </main>
  );
}
