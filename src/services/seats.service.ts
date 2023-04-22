import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class SeatsService extends BaseService {
  async getSeatsByRoom(roomId: number, query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/seats/${roomId}?page=${query.page}&limit=${query.limit}`,
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

  async createSeat(payload: { room_id: number; row_vip?: number[] }) {
    const { data } = await this.httpClient.post(`/seats`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const seatsService = new SeatsService();
