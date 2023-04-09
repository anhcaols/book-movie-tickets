import { BaseService } from './base.service';

export class OrdersService extends BaseService {
  async createOrder(payload: {
    user_id: number;
    seats: number[];
    schedule_id: number;
    foods?: { id: number; quantity: number }[];
  }) {
    const { data } = await this.httpClient.post('/orders', payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const ordersService = new OrdersService();
