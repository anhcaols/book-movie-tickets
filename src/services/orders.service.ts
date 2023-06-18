import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');
export class OrdersService extends BaseService {
  async getOrdersByUser(userId: number | string, query: { page: number; limit: number; dateTime?: any }) {
    function isValidDate(dateString: string) {
      var date = new Date(dateString);
      return !isNaN(date.getTime());
    }
    const { data } = await this.httpClient.get(
      isValidDate(query.dateTime)
        ? `/user-orders/${userId}/?page=${query.page}&limit=${query.limit}&dateTime=${query.dateTime}`
        : `/user-orders/${userId}/?page=${query.page}&limit=${query.limit}`,
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

  async getRevenueByMonth(year: any) {
    const { data } = await this.httpClient.get(
      `/orders/revenue-month/${year}`,
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

  async getReportRevenue(model: string) {
    const { data } = await this.httpClient.get(
      `/orders/report-revenue?model=${model}`,
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

  async getTicketByMonth(model: string) {
    const { data } = await this.httpClient.get(
      `/orders/ticket?model=${model}`,
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
