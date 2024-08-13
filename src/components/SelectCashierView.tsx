import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import type { Cashier } from "../mockData/cashier";

interface Props {
  cashiers?: Cashier[];
  setCashier: React.Dispatch<React.SetStateAction<Cashier | undefined>>;
}

export const SelectCashierView = ({ cashiers, setCashier }: Props) => {
  return (
    <Box>
      <List>
        <ListSubheader>
          <ListItemText primary="SELECT A CASHIER" />
        </ListSubheader>
        {cashiers?.map((cashier) => (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setCashier(cashier);
              }}
            >
              <ListItemText primary={cashier.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
