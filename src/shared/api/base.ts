import axios from 'axios';
import { useSessionStore } from '@/entities/session/model/store';

interface ApiErrorResponse {
  message?: string;
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

// 공통 응답 인터셉터
api.interceptors.response.use(
  // 정상 응답 시 실제 데이터만 반환
  (response) => response.data,
  (error) => {
    // 에러 응답에서 메시지를 우선적으로 추출
    // 서버 응답 메시지가 없을 경우 Axios 기본 에러 메시지 사용
    const message = error.response?.data?.message || error.message || 'API Error';
    return Promise.reject(new Error(message));
  }
);
