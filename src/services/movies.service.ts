import { BaseService } from './base.service';

export class MoviesService extends BaseService {
  async getMovies(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(`/movies?page=${query.page}&limit=${query.limit}`);

    return data;
  }

  async getMovie(slug: string) {
    const { data } = await this.httpClient.get(`/movies/${slug}`);
    return data;
  }

  async getNowShowingMovies(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(`/movies/now-showing?page=${query.page}&limit=${query.limit}`);

    return data;
  }

  async getComingSoonMovies(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(`/movies/coming-soon?page=${query.page}&limit=${query.limit}`);

    return data;
  }

  async createMovie(payload: FormData) {
    const { data } = await this.httpClient.post(`/movies`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const moviesService = new MoviesService();
