import { onCreateUser, onDeleteUser, onGetUsers, onUpdateUser } from '@redux/actions/accounts.action';
import { createSlice } from '@reduxjs/toolkit';

interface AccountsState {
  accounts: AccountEntity[];
  paginationOptions: ApiPagination;
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
  paginationOptions: initialPagination,
};

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetUsers.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateUser.fulfilled, (state, action) => {
      const { newAccount } = action.payload;
      state.accounts = [newAccount, ...state.accounts];
      state.paginationOptions = {
        totalDocs: state.paginationOptions.totalDocs + 1,
        offset: 0,
        limit: state.paginationOptions.limit,
        page: Math.ceil((state.paginationOptions.totalDocs + 1) / state.paginationOptions.limit),
        totalPages: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        hasPrevPage: state.paginationOptions.page > 1,
        hasNextPage: state.paginationOptions.page < state.paginationOptions.totalPages,
      };
    });

    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      const userId = action.payload.updateValues.id;
      const userIndex = state.accounts.findIndex(item => item.id === userId);
      console.log(userIndex);
      if (userIndex === -1) return;
      state.accounts[userIndex] = { ...state.accounts[userIndex], ...action.payload.updateValues };
    });
    builder.addCase(onDeleteUser.fulfilled, (state, action) => {
      const { userId } = action.payload;
      state.accounts = state.accounts.filter(item => item.id !== userId);
      state.paginationOptions.totalDocs -= 1;
      state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    });
  },
});

export const {} = accountSlice.actions;

export default accountSlice.reducer;
