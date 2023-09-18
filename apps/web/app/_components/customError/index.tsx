"use client";

type CustomErrorProps = {
  errorMessage: string;
  closeErrorMessage: () => void;
};

export default function CustomError({
  errorMessage,
  closeErrorMessage,
}: CustomErrorProps) {
  return (
    <div>
      <div>{errorMessage}</div>
      <button onClick={closeErrorMessage}>Close</button>
    </div>
  );
}
