import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Toast } from 'components';
import { ApiResponse, ToastOptions } from 'interfaces';

const appName = 'PrinterousPartner';
const tokenStorage = `${appName}UserToken`;
const langStorage = `${appName}Lang`;

const utils = {
  toRp(value: number): string {
    return `Rp ${(+value).toLocaleString('id')}`;
  },
  getToken(): string | null {
    return Cookies.get(tokenStorage) || null;
  },
  setToken(token: string): void {
    Cookies.set(tokenStorage, token);
  },
  removeToken(): void {
    Cookies.remove(tokenStorage);
  },
  showToast(toastOptions: ToastOptions): void {
    Toast(toastOptions);
  },
  logout() {
    Cookies.remove(tokenStorage);
    window.location.replace('/login');
  },
  getLang() {
    return Cookies.get(langStorage) || 'id';
  },
  setLang(lang: 'id' | 'en') {
    Cookies.set(langStorage, lang);
  },
  async apiHandler<T>(request: Promise<AxiosResponse<ApiResponse<T>>>): Promise<ApiResponse<T>> {
    try {
      return (await request).data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
      throw new Error(error as any);
    }
  },
  isEmpty(value: any[] | Object): boolean {
    if (!value) {
      return true;
    }
    if (Array.isArray(value)) {
      return !value.length;
    }
    if (typeof value === 'object') {
      return !Object.keys(value).length;
    }
    return true;
  },
  toNumberFormat(value: number) {
    return value.toLocaleString('id');
  },
};

export default utils;
