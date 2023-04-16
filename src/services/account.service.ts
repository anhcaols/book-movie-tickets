import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class AccountsService extends BaseService {
  async getUsers(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(`/accounts?page=${query.page}&limit=${query.limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
      },
    });

    return data;
  }

  async deleteUser(userId: { userId: number }) {
    const { data } = await this.httpClient.delete(`/accounts/${userId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateUser(
    payload: {
      full_name: string;
      phone_number: string;
      gender: string;
      date_of_birth: string | Date;
    },
    userId: { userId: number }
  ) {
    const { data } = await this.httpClient.patch(`/accounts/${userId}`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const accountsService = new AccountsService();
