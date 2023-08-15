import React from "react";
import { Button as MuiButton } from "@mui/material";

export default function Button({
  color,
  disabled = false,
  onClick = (_) => {},
  style = {},
  children,
}) {
  return (
    <MuiButton
      color={color}
      disabled={disabled}
      variant="contained"
      onClick={onClick}
      sx={{ textTransform: "capitalize", py: 0.6, px: 2 }}
      style={{
        ...style,
      }}
    >
      {children}
    </MuiButton>
  );
}
