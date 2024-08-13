import React from "react";
import { Box, Button, Icon } from "@mui/material";
import Typography from "@mui/joy/Typography";
import { mockCashiers, type Cashier } from "../mockData/cashier";
import { BarChart } from "@mui/x-charts";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
  cashier: Cashier;
  setCashier: React.Dispatch<React.SetStateAction<Cashier | undefined>>;
  setAddingSale: React.Dispatch<React.SetStateAction<boolean>>;
}

const xAxisData = mockCashiers.map((cashier) => cashier.id);
const xAxisLabel = mockCashiers.map((cashier) => cashier.name);

export const SalesDashView = ({
  cashier,
  setCashier,
  setAddingSale,
}: Props) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box display="flex" justifyContent="flex-end">
        <PersonIcon />
        <Typography>{cashier.name}</Typography>
      </Box>

      <BarChart
        series={[{ data: [35, 44, 24], label: "Cashier sales statistics" }]}
        height={300}
        xAxis={[{ data: xAxisLabel, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
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
