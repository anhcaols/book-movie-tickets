import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class RoomsService extends BaseService {
  async getRooms(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/rooms?page=${query.page}&limit=${query.limit}`,
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

  async getRoomsCreatedSeats() {
    const { data } = await this.httpClient.get(
      `/rooms-created-seats`,
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

  async getRoom(roomId: number) {
    const { data } = await this.httpClient.get(`/rooms/${roomId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createRoom(payload: { name: string; cinema_id: number; row_number: number; column_number: number }) {
    const { data } = await this.httpClient.post(`/rooms`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteRoom(roomId: number) {
    const { data } = await this.httpClient.delete(`/rooms/${roomId}`, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const roomsService = new RoomsService();
