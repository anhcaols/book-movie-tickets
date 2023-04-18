import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class CinemasService extends BaseService {
  async getCinemas(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/cinemas?page=${query.page}&limit=${query.limit}`,
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

  async getCinema(cinemaId: number) {
    const { data } = await this.httpClient.get(`/cinemas/${cinemaId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async createCinema(payload: { name: string; address: string }) {
    const { data } = await this.httpClient.post(`/cinemas`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteCinema(cinemaId: number) {
    const { data } = await this.httpClient.delete(`/cinemas/${cinemaId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateCinema(
    payload: {
      name: string;
      address: string;
    },
    cinemaId: number
  ) {
    const { data } = await this.httpClient.patch(`/cinemas/${cinemaId}`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const cinemasService = new CinemasService();
