import { useState } from "react";
// for brevity, I'm using from the mockData folder instead of fetching via API
import { mockCashiers } from "./mockData/cashier";
import type { Cashier } from "./mockData/cashier";
import { OrderView } from "./components/OrderView";
import { SalesDashView } from "./components/SalesDashView";
import { SelectCashierView } from "./components/SelectCashierView";

export const SimpleRouter = () => {
  const [cashier, setCashier] = useState<Cashier | undefined>();
  const [addingSale, setAddingSale] = useState(false);

  const isCashierSelected = cashier !== undefined;

  if (addingSale && isCashierSelected) {
    return (
      <OrderView
        cashier={cashier}
        setCashier={setCashier}
        setAddingSale={setAddingSale}
      />
    );
  }

  if (isCashierSelected) {
    return (
      <SalesDashView
        cashier={cashier}
        setCashier={setCashier}
        setAddingSale={setAddingSale}
      />
    );
  }

  return <SelectCashierView cashiers={mockCashiers} setCashier={setCashier} />;
};
