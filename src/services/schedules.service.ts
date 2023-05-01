import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';

export class SchedulesService extends BaseService {
  async getSchedulesByMovie(payload: { movie_id: number; date_time: string; cinema_name?: string; city?: string }) {
    const { data } = await this.httpClient.post('/all-schedules/movie', payload);

    return data;
  }

  async getSchedules(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(`/all-schedules?page=${query.page}&limit=${query.limit}`, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const schedulesService = new SchedulesService();
