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
    invoiceReceived: (state, action: PayloadAction<InvoiceType>) => {
      state.invoices.push(action.payload);
    },
    invoiceUpdated: (state, action: PayloadAction<InvoiceType>) => {
      state.invoices = state.invoices.map((invoice: InvoiceType) =>
        invoice.id === action.payload.id ? action.payload : invoice
      );
    },
    invoiceDeleted: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(
        (invoice: InvoiceType) => invoice.id !== action.payload
      );
    },
    invoiceMarkedAsPaid: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.map((invoice: InvoiceType) =>
        invoice.id === action.payload ? { ...invoice, status: 'paid' } : invoice
      );
    },
  },
});

export const {
  invoicesReceived,
  invoiceReceived,
  invoiceUpdated,
  invoiceDeleted,
  invoiceMarkedAsPaid,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;

export const selectInvoices = (state: RootState) => {
  return state.invoices;
};

export const selectInvoice = (state: RootState, id: string) => {
  const [invoice] = state.invoices.filter((invoice) => invoice.id === id);
  return invoice;
};
