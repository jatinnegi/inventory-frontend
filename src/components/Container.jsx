import React from "react";
import { Container as MuiContainer } from "@mui/material";

export default function MyContainer({ children }) {
  return (
    <MuiContainer maxWidth="xl" sx={{ my: 2 }}>
      {children}
    </MuiContainer>
  );
}
