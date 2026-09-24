import type { ApiErrorResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}

export async function apiClient<T extends object>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = (await response.json()) as T | ApiErrorResponse;

  if (!response.ok) {
    const errorMessage =
      "message" in data ? data.message : "Something went wrong";

    throw new Error(errorMessage);
  }

  return data as T;
}
