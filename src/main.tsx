import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SimpleRouter } from "./SimpleRouter";
import { Card, Grid } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card style={{ padding: "10px", minHeight: "500px" }}>
          <SimpleRouter />
        </Card>
      </Grid>
    </Grid>
  </StrictMode>
);
