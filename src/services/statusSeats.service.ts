import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class StatusSeatsService extends BaseService {
  async getStatusSeats(query: { page: number; limit: number }, payload: { schedule_id: number }) {
    const { data } = await this.httpClient.get(
      `/status-seats/schedule/${payload.schedule_id}?page=${query.page}&limit=${query.limit}`,
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
}

export const statusSeatsService = new StatusSeatsService();
