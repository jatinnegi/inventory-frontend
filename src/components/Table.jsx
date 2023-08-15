import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({ data }) {
  return (
    <Box width="100%" sx={{ my: 2 }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableColumnMenu
      />
    </Box>
  );
}
