import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { authService } from '@services/auth.service';
import { z } from 'zod';

const signInPayloadSchema = z.object({
  email: z.union([z.string(), z.string().email()]),
  password: z.string(),
  role: z.string().optional(),
});
type SignInPayload = z.infer<typeof signInPayloadSchema>;

export const onSignIn = createAsyncThunkWithCustomError<
  {
    accessToken: string;
    refreshToken: string;
    account: AccountEntity;
  },
  SignInPayload
>(
  'auth/sign-in',
  async payload => {
    signInPayloadSchema.parse(payload);
    const { email, password, role } = payload as SignInPayload;

    const response: any = await authService.signIn({
      email,
      password,
      role,
    });
    return {
      account: response.account,
      accessToken: response.accessToken,
      refreshToken: response.refresh_token,
    };
  },
  {
    defaultErrorMessage: 'Sign in failed!',
  }
);
