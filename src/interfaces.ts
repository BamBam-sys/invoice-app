export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface ItemInterface {
  name: string;
  quantity: string;
  price: string;
  total: string;
}

export interface InvoiceType {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: ItemInterface[];
  total: string;
}
