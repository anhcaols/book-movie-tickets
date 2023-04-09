import { createSlice } from '@reduxjs/toolkit';

interface StatusSeatsState {
  invoiceData: any;
}

const invoiceDataInitialState: StatusSeatsState = {
  invoiceData: {},
};

export const invoiceDataSlice = createSlice({
  name: 'invoiceData',
  initialState: invoiceDataInitialState,
  reducers: {
    onSetInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    onClearInvoiceData: state => {
      state.invoiceData = {};
    },
  },
});

export const { onSetInvoiceData, onClearInvoiceData } = invoiceDataSlice.actions;

export default invoiceDataSlice.reducer;
