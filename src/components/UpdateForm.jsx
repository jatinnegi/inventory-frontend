import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function UpdateForm({
  display,
  setDisplay,
  data,
  handleTableUpdate,
}) {
  let updatedRows = {};

  const handleClose = () => {
    setDisplay(false);
  };

  return (
    <Dialog open={display} onClose={handleClose}>
      <DialogTitle>Update Table</DialogTitle>
      <DialogContent>
        <DataGrid
          rows={data.rows}
          columns={(() => {
            const columns = [];

            data.columns.forEach((column) => {
              if (column.field !== "Actions")
                columns.push({ ...column, editable: true });
            });
            return columns;
          })()}
          disableColumnMenu
          disableRowSelectionOnClick
          editMode="row"
          onStateChange={(e) => {
            if (e.editRows) {
              const id = Object.keys(e.editRows)[0];
              const updatedRow = Object.values(e.editRows)[0];

              if (updatedRow)
                updatedRows = { ...updatedRows, [id]: updatedRow };
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            if (Object.keys(updatedRows).length > 0) {
              handleTableUpdate(updatedRows);
              updatedRows = {};
            }
            setDisplay(false);
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
