import { NEXT_APP_API_BASE_URL } from '@configs/app.config';
import { Http } from './http.service';

export class BaseService {
  protected httpClient: Http;

  constructor() {
    const httpClient = new Http();
    httpClient.setCustomConfigs({
      baseUrl: `${NEXT_APP_API_BASE_URL}/api`,
    });
    this.httpClient = httpClient;
  }
}

export const baseService = new BaseService();
