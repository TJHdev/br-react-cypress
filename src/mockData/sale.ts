export const mockSale = [
  {
    cashierId: 1,
    saleAmount: 100.0,
  },
  {
    cashierId: 1,
    saleAmount: 200.0,
  },
  {
    cashierId: 2,
    saleAmount: 500.0,
  },
  {
    cashierId: 1,
    saleAmount: 150.0,
  },
  {
    cashierId: 3,
    saleAmount: 300.0,
  },
];

export type Sale = (typeof mockSale)[number];
