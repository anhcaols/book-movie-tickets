import { BaseService } from './base.service';

export class AuthService extends BaseService {
  async signUp(signInPayload: {
    username: string;
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const { data } = await this.httpClient.post('/auth/register', signInPayload);
    return data;
  }

  async signIn(signInPayload: { email: string; password: string }) {
    const { data } = await this.httpClient.post('/auth/login', signInPayload);
    return data;
  }
}

export const authService = new AuthService();
