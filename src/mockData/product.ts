export const mockProducts = [
  {
    sku: 1,
    name: "Apple",
    descr: "Top Red",
    price: 1.01,
  },
  {
    sku: 2,
    name: "Orange",
    descr: "Extra Juicy",
    price: 2.02,
  },
  {
    sku: 3,
    name: "Strawberries",
    descr: "Freshly Picked",
    price: 3.03,
  },
];

export type Product = (typeof mockProducts)[number];
