import { onCreateUser, onDeleteUser, onGetUsers, onUpdateUser } from '@redux/actions/accounts.action';
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
      const { newAccount } = action.payload;
      state.accounts = [newAccount, ...state.accounts];
      state.accountsPagination = {
        totalDocs: state.accountsPagination.totalDocs + 1,
        offset: 0,
        limit: state.accountsPagination.limit,
        page: Math.ceil((state.accountsPagination.totalDocs + 1) / state.accountsPagination.limit),
        totalPages: Math.ceil(state.accountsPagination.totalDocs / state.accountsPagination.limit),
        hasPrevPage: state.accountsPagination.page > 1,
        hasNextPage: state.accountsPagination.page < state.accountsPagination.totalPages,
      };
    });

    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      const userId = action.payload.updateValues.id;
      const userIndex = state.accounts.findIndex(item => item.id === userId);
      if (userIndex === -1) return;
      state.accounts[userIndex] = { ...state.accounts[userIndex], ...action.payload.updateValues };
    });
    builder.addCase(onDeleteUser.fulfilled, (state, action) => {
      const { userId } = action.payload;
      state.accounts = state.accounts.filter(item => item.id !== userId);
      state.accountsPagination.totalDocs -= 1;
      state.accountsPagination.totalPages = Math.ceil(
        state.accountsPagination.totalDocs / state.accountsPagination.limit
      );
    });
  },
});

export const {} = accountSlice.actions;

export default accountSlice.reducer;
