import { onCreateUser, onGetUsers } from '@redux/actions/accounts.action';
import { createSlice } from '@reduxjs/toolkit';

interface AccountsState {
  accounts: AccountEntity[];
  accountsPagination: ApiPagination;
}

const initialPagination = {
  totalDocs: 0,
  offset: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const accountsInitialState: AccountsState = {
  accounts: [],
  accountsPagination: initialPagination,
};

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetUsers.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.accountsPagination = action.payload.accountsPagination;
    });
    builder.addCase(onCreateUser.fulfilled, (state, action) => {
      state.accounts = [...state.accounts, action.payload.newAccount];
      state.accountsPagination = initialPagination;
    });
  },
});

export const {} = accountSlice.actions;

export default accountSlice.reducer;
