import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Cashier } from "../mockData/cashier";
import { mockProducts } from "../mockData/product";
import { Typography } from "@mui/joy";
import Paper from "@mui/material/Paper";
import { roundCurrency } from "../utils/roundCurrency";
import { addSale } from "../service/localStorageSales";

interface Props {
  cashier: Cashier;
  setAddingSale: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderView = ({ cashier, setAddingSale }: Props) => {
  const [itemQuantity, setItemQuantity] = useState<Record<number, number>>({});

  const totalItems = useMemo(() => {
    return Object.values(itemQuantity).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }, [itemQuantity]);

  const totalCost = useMemo(() => {
    const total = Object.entries(itemQuantity).reduce((acc, curr) => {
      const product = mockProducts.find(
        (product) => product.sku === Number(curr[0])
      );
      const quantity = curr[1];
      if (product) {
        return acc + product.price * quantity;
      }
      return acc;
    }, 0);

    return roundCurrency(total);
  }, [itemQuantity]);

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
          <Box p="5px">
            <Typography>Items: {totalItems}</Typography>
          </Box>
          <Box p="5px">
            <Typography>Cost: £{totalCost}</Typography>
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProducts.map((row) => {
              let quantity = 0;
              if (
                typeof itemQuantity[row.sku] === "number" &&
                itemQuantity[row.sku] >= 0
              ) {
                quantity = itemQuantity[row.sku];
              }

              const total = roundCurrency(quantity * row.price);

              return (
                <TableRow
                  key={row.sku}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>
                      <b>{row.name}</b>
                    </Typography>
                    <Typography>{row.descr}</Typography>
                  </TableCell>
                  <TableCell align="right">£{row.price}</TableCell>
                  <TableCell align="right">
                    <Input
                      onChange={(event) => {
                        setItemQuantity({
                          ...itemQuantity,
                          [row.sku]: parseInt(event.target.value, 10),
                        });
                      }}
                      type="number"
                      inputProps={{ min: 0 }}
                      value={quantity}
                    ></Input>
                  </TableCell>
                  <TableCell align="right">£{total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" pt="20px">
        <Button
          variant="contained"
          onClick={() => {
            addSale(cashier.id, totalCost);
            setAddingSale(false);
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
