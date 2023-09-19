import { ServerAppError } from "@/types/fetcher";

export function createErrorMessageForServer(error: ServerAppError | undefined): string {
  return `Error: ${error?.error || "Unexpected error"}, ${
    error?.message || "Unexpected"
  }, code ${error?.statusCode}.`;
}
