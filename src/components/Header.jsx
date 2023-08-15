import React, { useRef } from "react";
import { Box } from "@mui/material";
import * as xlsx from "xlsx";
import Button from "./Button";

export default function Header({ initData }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        initData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  return (
    <Box>
      <Button
        color="secondary"
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        Browse
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </Box>
  );
}
