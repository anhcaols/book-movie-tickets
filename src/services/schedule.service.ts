import { BaseService } from './base.service';

export class SchedulesService extends BaseService {
  async getSchedules(payload: { movie_id: number; date_time: string; cinema_name?: string; city?: string }) {
    const { data } = await this.httpClient.post('/all-schedules/movie', payload);

    return data;
  }
}

export const schedulesService = new SchedulesService();
