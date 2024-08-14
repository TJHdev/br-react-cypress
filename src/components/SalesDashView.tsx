import React, { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { mockCashiers, type Cashier } from "../mockData/cashier";
import { BarChart } from "@mui/x-charts";
import PersonIcon from "@mui/icons-material/Person";
import { loadSalesFromLocalStorage } from "../service/localStorageSales";
import { Sale } from "../mockData/sale";

interface Props {
  cashier: Cashier;
  setCashier: React.Dispatch<React.SetStateAction<Cashier | undefined>>;
  setAddingSale: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SalesDashView = ({
  cashier,
  setCashier,
  setAddingSale,
}: Props) => {
  // on mount load localStorage into setState
  const [allSales] = useState<Sale[]>(loadSalesFromLocalStorage());

  const salesGroupedByCashier = useMemo(() => {
    const obj = allSales.reduce((acc, curr) => {
      if (!acc[curr.cashierId]) {
        acc[curr.cashierId] = curr.saleAmount;
      } else {
        acc[curr.cashierId] += curr.saleAmount;
      }
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(obj);
  }, [allSales]);

  const cashierKeyedById = mockCashiers.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<number, Cashier>);

  const xAxisLabel = salesGroupedByCashier.map(
    (cashier) => cashierKeyedById[Number(cashier[0])].name
  );

  const xAxisData = salesGroupedByCashier.map((cashier) => cashier[1]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box display="flex" justifyContent="flex-end">
        <PersonIcon />
        <Typography>{cashier.name}</Typography>
      </Box>

      <BarChart
        series={[{ data: xAxisData, label: "Cashier sales statistics" }]}
        height={300}
        xAxis={[{ data: xAxisLabel, scaleType: "band" }]}
      />

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={() => {
            setCashier(undefined);
          }}
        >
          Switch Cashier
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setAddingSale(true);
          }}
        >
          Add sale
        </Button>
      </Box>
    </Box>
  );
};
