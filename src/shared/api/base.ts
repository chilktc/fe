import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useSessionStore } from '@/entities/session/model/store';

interface ApiErrorResponse {
  message?: string;
}

interface RefreshResponse {
  token: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
  }
}


// BFF(Backend for Frontend)를 통해 호출하기 위한 Axios 인스턴스
export const api = axios.create({
  baseURL: '', // BFF 기준 상대 경로 사용
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Access Token 추가
api.interceptors.request.use((config) => {
  const token = useSessionStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 토큰 재발급 로직
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await fetch('/api/refresh', { 
          method: 'POST',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Refresh failed');
        }
        
        const data: RefreshResponse = await response.json();
        const { token } = data;

        useSessionStore.getState().setAccessToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        processQueue(null, token);
        
        return api(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        useSessionStore.getState().clearSession();
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    const message = 
      error.response?.data?.message || 
      error.message || 
      'API Error';
    return Promise.reject(new Error(message));
  }
);