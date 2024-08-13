export const mockCashiers = [
  {
    id: 1,
    name: "Bob",
  },
  {
    id: 2,
    name: "Sarah",
  },
  {
    id: 3,
    name: "Dave",
  },
];

export type Cashier = (typeof mockCashiers)[number];
