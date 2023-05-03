import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');
export class FoodsService extends BaseService {
  async getFoods(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/foods?page=${query.page}&limit=${query.limit}`,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken} `,
            },
          }
        : { isPrivateAPI: true }
    );

    return data;
  }

  async getFood(foodId: number) {
    const { data } = await this.httpClient.get(`/foods/${foodId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createFood(payload: FormData) {
    const { data } = await this.httpClient.post(`/foods`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateFood(foodId: number, payloadUpdate: FormData) {
    const { data } = await this.httpClient.patch(`/foods/${foodId}`, payloadUpdate, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteFood(foodId: number) {
    const { data } = await this.httpClient.delete(`/foods/${foodId}`, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const foodsService = new FoodsService();
