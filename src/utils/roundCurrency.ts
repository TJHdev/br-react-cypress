export const roundCurrency = (value: number): number => {
  return Number(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  );
};
