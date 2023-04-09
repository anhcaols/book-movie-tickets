import { BaseService } from './base.service';

export class FoodsService extends BaseService {
  async getFoods() {
    const { data } = await this.httpClient.get('/foods', {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const foodsService = new FoodsService();
