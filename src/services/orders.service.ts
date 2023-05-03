import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');
export class OrdersService extends BaseService {
  async getOrdersByUser(userId: number | string, query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/user-orders/${userId}/?page=${query.page}&limit=${query.limit}`,
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

  async deleteOrder(orderId: number) {
    const { data } = await this.httpClient.delete(`/orders/${orderId}`, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const ordersService = new OrdersService();
