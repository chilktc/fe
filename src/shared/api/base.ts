import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useSessionStore } from "@/entities/session/model/store";

interface ApiErrorResponse {
  message?: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

declare module "axios" {
  export interface AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    put<T = unknown, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    patch<T = unknown, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

const REFRESH_EXCLUDED_PATHS = ["/auth/refresh", "/auth/logout", "/auth/oauth/login"];

const isRefreshExcludedRequest = (url?: string) =>
  !!url && REFRESH_EXCLUDED_PATHS.some((path) => url.includes(path));

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshExcludedRequest(originalRequest.url)
    ) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err: Error) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Refresh failed");
        }

        const data: { data?: { accessToken?: string }; accessToken?: string } =
          await response.json();

        const newAccessToken = data.data?.accessToken || data.accessToken || null;

        if (!newAccessToken) {
          throw new Error("Access token not found");
        }

        useSessionStore.getState().setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        const refreshError =
          err instanceof Error ? err : new Error("Refresh failed");

        processQueue(refreshError, null);
        useSessionStore.getState().clearSession();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message || error.message || "API Error";

    return Promise.reject(new Error(message));
  },
);
