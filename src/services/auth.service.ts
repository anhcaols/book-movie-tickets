import { BaseService } from './base.service';

export class AuthService extends BaseService {
  async signUp(signUpPayload: {
    full_name: string;
    email: string;
    phone_number?: string;
    password: string;
    confirm_password: string;
    gender?: string;
    date_of_birth?: string | Date;
  }) {
    const { data } = await this.httpClient.post('/auth/register', signUpPayload);
    return data;
  }

  async signIn(signInPayload: { email: string; password: string; role?: string }) {
    const { data } = await this.httpClient.post('/auth/login', signInPayload);
    return data;
  }

  async validateToken({ token }: { token: string }) {
    const { data } = await this.httpClient.get('/accounts/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  setToken(accessToken: string) {
    this.httpClient.setCustomConfigs({
      authentication: {
        token: accessToken,
      },
    });
  }
}

export const authService = new AuthService();
