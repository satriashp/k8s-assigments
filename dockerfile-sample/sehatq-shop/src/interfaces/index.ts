import { TypeOptions } from 'react-toastify';

export interface ToastOptions {
  title?: string;
  message: string;
  type: TypeOptions;
}

export interface Route {
  title: string;
  path: string | string[];
  component: React.LazyExoticComponent<React.NamedExoticComponent>;
  exact?: boolean;
  isRedirect?: boolean;
}

export interface ApiResponse<T> {
  code: number;
  messages: string[];
  data: T;
  pagination: Pagination;
}

export interface ErrorResponse {
  code: number;
  messages: string[];
}

export interface Pagination {
  total_entries: number;
  total_pages: number;
  current_page: number;
  next_page?: number;
  prev_page?: number;
  per_page: number;
}
