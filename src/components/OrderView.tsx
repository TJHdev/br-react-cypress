import React from "react";
import { Box, Button } from "@mui/material";
import type { Cashier } from "../mockData/cashier";
import { mockProducts } from "../mockData/product";
import { Typography } from "@mui/joy";

interface Props {
  cashier: Cashier;
  setCashier: React.Dispatch<React.SetStateAction<Cashier | undefined>>;
  setAddingSale: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderView = ({ cashier, setCashier, setAddingSale }: Props) => {
  const totalItems = 5;
  const totalCost = 5.23;

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Button
          variant="contained"
          onClick={() => {
            setAddingSale(false);
          }}
        >
          Back
        </Button>

        <Typography>Sale</Typography>

        <Box>
          <Box bgcolor="grey" p="5px">
            <Typography>Items: {totalItems}</Typography>
          </Box>
          <Box bgcolor="grey" p="5px">
            <Typography>Cost: £{totalCost}</Typography>
          </Box>
        </Box>
      </Box>

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
