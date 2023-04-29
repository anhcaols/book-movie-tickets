import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class SeatTypesService extends BaseService {
  async getSeatTypes(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/seat-types?page=${query.page}&limit=${query.limit}`,
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

  async getSeatType(seatTypeId: number) {
    const { data } = await this.httpClient.get(`/seat-types/${seatTypeId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createSeatType(payload: { type: string; price: string }) {
    const { data } = await this.httpClient.post(`/seat-types`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteSeatType(seatTypeId: number) {
    const { data } = await this.httpClient.delete(`/seat-types/${seatTypeId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateSeatType(
    payload: {
      price: string;
    },
    seatTypeId: number
  ) {
    const { data } = await this.httpClient.patch(`/seat-types${seatTypeId}`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const seatTypesService = new SeatTypesService();
