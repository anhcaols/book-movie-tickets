import { getCookie } from 'cookies-next';
import { BaseService } from './base.service';
const accessToken = getCookie('accessToken');

export class AccountsService extends BaseService {
  async getUsers(query: { page: number; limit: number }) {
    const { data } = await this.httpClient.get(
      `/accounts?page=${query.page}&limit=${query.limit}`,
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

  async getUser(userId: number) {
    const { data } = await this.httpClient.get(`/accounts/${userId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async deleteUser(userId: number) {
    const { data } = await this.httpClient.delete(`/accounts/${userId}`, {
      isPrivateAPI: true,
    });

    return data;
  }

  async updateUser(
    payload: {
      full_name: string;
      email: string;
      phone_number: string;
      gender: string;
      date_of_birth: string | Date;
    },
    userId: number
  ) {
    const { data } = await this.httpClient.patch(`/accounts/${userId}`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }

  async changePassword(payload: { old_password: string; new_password: string; confirm_password: string }) {
    const { data } = await this.httpClient.post(`/accounts/change_password`, payload, {
      isPrivateAPI: true,
    });

    return data;
  }
}

export const accountsService = new AccountsService();
