import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Form({ data, setData, update }) {
  const handleClose = () => {
    setData(null);
  };

  return (
    <Dialog open={data !== null} onClose={handleClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {data &&
          Object.keys(data).map((key) => {
            if (key === "id") return null;

            return (
              <Box key={key} style={{ width: "200px" }}>
                <TextField
                  autoFocus
                  type="text"
                  name={key}
                  label={key}
                  value={data[key]}
                  onChange={(e) => {
                    setData({ ...data, [e.target.name]: e.target.value });
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={update}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
