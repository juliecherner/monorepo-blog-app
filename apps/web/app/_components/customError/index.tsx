"use client";

type CustomErrorProps = {
  errorMessage: string;
  action: () => void;
  buttonText: string;
};

export default function CustomError({
  errorMessage,
  action,
  buttonText
}: CustomErrorProps) {
  return (
    <div>
      <div>{errorMessage}</div>
      <button onClick={action}>{buttonText}</button>
    </div>
  );
}
