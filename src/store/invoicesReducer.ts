import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvoiceType } from '../interfaces';
import { RootState } from './store';

// Define a type for the slice state
interface InvoicesState {
  invoices: InvoiceType[];
}

// Define the initial state using that type
const initialState: InvoicesState = {
  invoices: [],
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoicesReceived: (state, action: PayloadAction<InvoiceType[]>) => {
      state.invoices = action.payload;
    },
  },
});

export const { invoicesReceived } = invoicesSlice.actions;

export default invoicesSlice.reducer;

export const selectInvoices = (state: RootState) => {
  return state.invoices;
};

export const selectInvoice = (state: RootState, id: string) => {
  return state.invoices.filter((invoice) => invoice.id === id);
};
