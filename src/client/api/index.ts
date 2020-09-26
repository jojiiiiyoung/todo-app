/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosError, AxiosPromise } from 'axios';

const BASE_URI = '/api';

const errorHandler = (error: AxiosError) => {
  console.log(error);
};

export default class Api {
  private static axiosInstance: AxiosInstance | undefined;

  public static axios() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create();
    }
    return this.axiosInstance;
  }

  protected static get(url: string): AxiosPromise {
    return this.axios()
      .get(`${BASE_URI}${url}`)
      .catch((err: AxiosError) => {
        errorHandler(err);
        return Promise.reject(err);
      });
  }

  protected static post(url: string, data?: any): AxiosPromise {
    return this.axios()
      .post(`${BASE_URI}${url}`, data)
      .catch((err: AxiosError) => {
        errorHandler(err);
        return Promise.reject(err);
      });
  }

  protected static patch(url: string, data: any): AxiosPromise {
    return this.axios()
      .patch(`${BASE_URI}${url}`, data)
      .catch((err: AxiosError) => {
        errorHandler(err);
        return Promise.reject(err);
      });
  }

  protected static delete(url: string): AxiosPromise {
    return this.axios()
      .delete(`${BASE_URI}${url}`)
      .catch((err: AxiosError) => {
        errorHandler(err);
        return Promise.reject(err);
      });
  }
}
