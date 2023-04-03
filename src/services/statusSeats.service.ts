import { BaseService } from './base.service';

export class StatusSeatsService extends BaseService {
  async getStatusSeats(query: { page: number; limit: number }, payload: { schedule_id: number }) {
    const { data } = await this.httpClient.post(
      `/status-seats/schedule?page=${query.page}&limit=${query.limit}`,
      payload,
      {
        isPrivateAPI: true,
      }
    );

    return data;
  }
}

export const statusSeatsService = new StatusSeatsService();
