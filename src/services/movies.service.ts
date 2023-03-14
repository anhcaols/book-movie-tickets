import { BaseService } from './base.service';

export class MoviesService extends BaseService {
  async getMovies(payload?: { query: Record<string, string> }) {
    const {
      query = {
        page: '1',
        limit: '8',
      },
    } = payload || {};

    const queryString = new URLSearchParams(query).toString();
    const { data } = await this.httpClient.get(`/movies?${queryString}`);

    return data;
  }

  async getMovie(payload: { slug: string }) {
    const { data } = await this.httpClient.get(`/movies/${payload.slug}`);
    return data;
  }

  async getNowShowingMovies(payload?: { query: Record<string, string> }) {
    const {
      query = {
        page: '1',
        limit: '8',
      },
    } = payload || {};

    const queryString = new URLSearchParams(query).toString();
    const { data } = await this.httpClient.get(`/movies/now-showing?${queryString}`);

    return data;
  }

  async getComingSoonMovies(payload?: { query: Record<string, string> }) {
    const {
      query = {
        page: '1',
        limit: '8',
      },
    } = payload || {};

    const queryString = new URLSearchParams(query).toString();
    const { data } = await this.httpClient.get(`/movies/coming-soon?${queryString}`);

    return data;
  }
}

export const moviesService = new MoviesService();
