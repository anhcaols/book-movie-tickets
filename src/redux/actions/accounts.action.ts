import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { accountsService } from '@services/account.service';
import { z } from 'zod';

const getUsersPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

type GetUsersPayload = z.infer<typeof getUsersPayloadSchema>;

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
