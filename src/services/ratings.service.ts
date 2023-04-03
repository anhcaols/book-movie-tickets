import { BaseService } from './base.service';

export class RatingsService extends BaseService {
  async getRatings(query: { page: number; limit: number }, movieId: number) {
    const { data } = await this.httpClient.get(`/ratings/${movieId}?page=${query.page}&limit=${query.limit}`);

    return data;
  }

  async createRating(payload: { user_id: number; movie_id: number; rate: number; content?: string }) {
    const { data } = await this.httpClient.post('/ratings', payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const ratingsService = new RatingsService();
