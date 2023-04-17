import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { accountsService } from '@services/account.service';
import { authService } from '@services/auth.service';
import { z } from 'zod';

const getUsersPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const createUserPayloadSchema = z.object({
  full_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  password: z.string(),
  confirm_password: z.string(),
  gender: z.string(),
  date_of_birth: z.union([z.string(), z.date()]),
});

const updateUserPayloadSchema = z.object({
  dataValues: z.object({
    full_name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    gender: z.string(),
    date_of_birth: z.union([z.string(), z.date()]),
  }),
  userId: z.number(),
});

type GetUsersPayload = z.infer<typeof getUsersPayloadSchema>;
type CreateUsersPayload = z.infer<typeof createUserPayloadSchema>;
type UpdateUsersPayload = z.infer<typeof updateUserPayloadSchema>;

export const onGetUsers = createAsyncThunkWithCustomError<
  {
    accounts: AccountEntity[];
    accountsPagination: ApiPagination;
  },
  GetUsersPayload
>(
  'accounts',
  async payload => {
    getUsersPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await accountsService.getUsers(query);
    return {
      accounts: response.accounts,
      accountsPagination: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching accounts',
  }
);

export const onCreateUser = createAsyncThunkWithCustomError<
  {
    newAccount: AccountEntity;
  },
  CreateUsersPayload
>(
  'accounts/add',
  async payload => {
    createUserPayloadSchema.parse(payload);
    const response: any = await authService.signUp(payload);
    return {
      newAccount: response.account,
    };
  },
  {
    defaultErrorMessage: 'Error while create user',
  }
);

export const onUpdateUser = createAsyncThunkWithCustomError<
  {
    updateValues: AccountEntity;
  },
  UpdateUsersPayload
>(
  'accounts/update',
  async payload => {
    updateUserPayloadSchema.parse(payload);
    const { dataValues, userId } = payload;
    console.log(payload);
    const response: any = await accountsService.updateUser(dataValues, userId);
    return {
      updateValues: response.account,
    };
  },
  {
    defaultErrorMessage: 'Error while create user',
  }
);
