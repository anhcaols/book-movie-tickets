import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IHttpRequestConfig extends AxiosRequestConfig {
  isPrivateAPI?: boolean;
}

interface IHttpConfig extends IHttpRequestConfig {
  handleBeforeRequestSend?: (value: IHttpRequestConfig) => IHttpRequestConfig | Promise<IHttpRequestConfig>;
}

interface IHttpCustomConfigs {
  baseUrl: string;
  authentication: {
    token: string;
  };
}

const initialHttpCustomConfigs: IHttpCustomConfigs = {
  baseUrl: '',
  authentication: {
    token: '',
  },
};

export class Http {
  private instance: AxiosInstance;

  private customConfigs: IHttpCustomConfigs = initialHttpCustomConfigs;

  constructor(config?: IHttpConfig) {
    const { handleBeforeRequestSend = this.handleBeforeRequestSend } = config || {};

    const instance = axios.create();
    // @ts-ignore
    instance.interceptors.request.use(handleBeforeRequestSend);
    this.instance = instance;
  }

  private handleBeforeRequestSend = (config: IHttpRequestConfig) => {
    const { isPrivateAPI, ...otherConfig } = config;
    const token = this.customConfigs.authentication.token;

    if (isPrivateAPI && otherConfig.headers) {
      console.log(token);
      Object.assign(otherConfig.headers, {
        Authorization: `Bearer ${token}`,
      });
    }

    return otherConfig;
  };

  async get<T>(url: string, config?: IHttpRequestConfig) {
    const { instance } = this;
    // @ts-ignore
    instance.interceptors.request.use(this.handleBeforeRequestSend);
    const response = await instance.get<T>(url, config);
    return response;
  }

  async post<T>(url: string, data?: T, config?: IHttpRequestConfig) {
    const { instance } = this;
    const response = await instance.post<T>(url, data, config);
    return response;
  }

  async patch<T>(url: string, data: T, config?: IHttpRequestConfig) {
    const { instance } = this;
    const response = await instance.patch(url, data, config);
    return response;
  }

  async delete(url: string, config?: IHttpRequestConfig) {
    const { instance } = this;
    const response = await instance.delete(url, config);
    return response;
  }

  getToken() {
    return this.customConfigs.authentication.token;
  }

  setCustomConfigs(configs: Partial<IHttpCustomConfigs>) {
    if (configs.baseUrl) {
      this.instance.defaults.baseURL = configs.baseUrl;
    }

    this.customConfigs = Object.assign(initialHttpCustomConfigs, configs);
  }
}
