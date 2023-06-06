import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';

export class SchedulesService extends BaseService {
  async getSchedulesByMovie(payload: { movie_id: number; date_time: string; cinema_name?: string; city?: string }) {
    const { data } = await this.httpClient.post('/all-schedules/movie', payload);

    return data;
  }

  async getSchedules(query: { page: number; limit: number; dateTime?: any; movieId?: number }) {
    function isValidDate(dateString: string) {
      var date = new Date(dateString);
      return !isNaN(date.getTime());
    }

    let url = '';
    if (isValidDate(query.dateTime)) {
      url = `/all-schedules?page=${query.page}&limit=${query.limit}&dateTime=${query.dateTime}`;
      if (query.movieId) {
        url = `/all-schedules?page=${query.page}&limit=${query.limit}&dateTime=${query.dateTime}&movieId=${query.movieId}`;
      } else {
        url = `/all-schedules?page=${query.page}&limit=${query.limit}&dateTime=${query.dateTime}`;
      }
    } else {
      url = `/all-schedules?page=${query.page}&limit=${query.limit}`;
    }

    const { data } = await this.httpClient.get(url, {
      isPrivateAPI: true,
    });

    return data;
  }

  async getSchedule(scheduleId: number) {
    const { data } = await this.httpClient.get(`/schedules/${scheduleId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createSchedule(payload: { movie_id: number; room_id: number; start_time: string; end_time: string }) {
    const { data } = await this.httpClient.post(`/schedules`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateSchedule(
    payload: {
      start_time: string;
      end_time: string;
    },
    scheduleId: number
  ) {
    const { data } = await this.httpClient.patch(`/schedules/${scheduleId}`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const schedulesService = new SchedulesService();
