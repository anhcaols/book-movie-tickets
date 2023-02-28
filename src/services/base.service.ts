import { Http } from './http.service';

export class BaseService {
  protected httpClient: Http;

  constructor() {
    const httpClient = new Http();
    httpClient.setCustomConfigs({
      baseUrl: 'http://localhost:8080/api',
    });
    this.httpClient = httpClient;
  }
}

export const baseService = new BaseService();
