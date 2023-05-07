import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');
export class GenresService extends BaseService {
  async getGenres(query?: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/genres?page=${query?.page}&limit=${query?.limit}`,
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

  async getGenre(genreId: number) {
    const { data } = await this.httpClient.get(`/genres/${genreId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createGenre(payload: { name: string }) {
    const { data } = await this.httpClient.post(`/genres`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateGenre(genreId: number, payloadUpdate: { name: string }) {
    const { data } = await this.httpClient.patch(`/genres/${genreId}`, payloadUpdate, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteGenre(genreId: number) {
    const { data } = await this.httpClient.delete(`/genres/${genreId}`, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const genresService = new GenresService();
