import type { Sale } from "../mockData/sale";

// Function to save data to localStorage
export const saveSalesToLocalStorage = (sales: Sale[]): void => {
  localStorage.setItem("sales", JSON.stringify(sales));
};

// Function to load data from localStorage
export const loadSalesFromLocalStorage = (): Sale[] => {
  const salesData = localStorage.getItem("sales");
  return salesData ? JSON.parse(salesData) : [];
};

// Function to add a new sale
export const addSale = (cashierId: number, saleAmount: number): void => {
  const sales = loadSalesFromLocalStorage();
  sales.push({ cashierId, saleAmount });
  saveSalesToLocalStorage(sales);
};
