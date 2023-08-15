import { useRef, useEffect, useState } from "react";
import { Box, Button as MuiButton, TextField, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";
import Container from "./components/Container";
import Header from "./components/Header";
import Table from "./components/Table";
import Button from "./components/Button";
import { CSVLink } from "react-csv";
import { parseData } from "./utils";

export default function App() {
  const csvRef = useRef(null);
  const [filter, setFilter] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [table, setTable] = useState({ columns: [], rows: [] });
  const [tableData, setTableData] = useState({
    display: false,
    columns: [],
    rows: [],
  });
  const [formData, setFormData] = useState(null);
  const [index, setIndex] = useState(0);
  const [deleteAction, setDeleteAction] = useState(false);

  useEffect(() => {
    if (index === 0) return;

    if (deleteAction) {
      let updatedRows = tableData.rows.filter((row) => row.id !== index);
      setTableData({ ...tableData, rows: updatedRows });

      updatedRows = table.rows.filter((row) => row.id !== index);
      setTable({ ...table, rows: updatedRows });

      setDeleteAction(false);
    } else {
      const row = tableData.rows.find((row) => row.id === index);
      setFormData(row);
    }
  }, [index]);

  function initData(rows) {
    const [tableColumns, tableRows] = parseData(rows, handleEdit, handleDelete);
    setTable({ columns: tableColumns, rows: tableRows });
    setTableData({ display: true, columns: tableColumns, rows: tableRows });
  }

  function handleEdit(params) {
    const id = params.id;
    setIndex(id);
  }

  function handleDelete(params) {
    const id = params.id;
    setIndex(id);
    setDeleteAction(true);
  }

  function applyFilter() {
    if (filter.length < 3)
      setTableData({ ...tableData, columns: table.columns, rows: table.rows });
    else {
      const rows = [];

      table.rows.forEach((row) => {
        let match = false;

        for (let i = 0; i < table.columns.length - 1; i++) {
          const column = table.columns[i].field;

          if (row[column] && row[column].toString().includes(filter)) {
            match = true;
            break;
          }
        }

        if (match) rows.push(row);
      });

      setTableData({ ...tableData, rows });
    }
  }

  function handleUpdate() {
    if (!formData) return;

    const id = formData.id;

    let updatedRows = tableData.rows.map((row) => {
      if (row.id === id) return formData;
      return row;
    });

    setTableData({ ...tableData, rows: updatedRows });

    updatedRows = table.rows.map((row) => {
      if (row.id === id) return formData;
      return row;
    });

    setTable({ ...table, rows: updatedRows });
    setFormData(null);
    setIndex(0);
  }

  const csvData = [];

  let currentRow = [];

  for (let i = 0; i < tableData.columns.length - 1; i++) {
    currentRow.push(tableData.columns[i].field);
  }
  csvData.push(currentRow);

  for (let i = 0; i < tableData.rows.length; i++) {
    currentRow = [];

    Object.keys(tableData.rows[i]).forEach((key) => {
      if (key !== "id") currentRow.push(tableData.rows[i][key]);
    });

    csvData.push(currentRow);
  }

  return (
    <Container>
      <Header initData={initData} />
      {tableData.display && (
        <Box marginY="20px">
          <Box display="flex" style={{ marginBottom: "10px" }}>
            <TextField
              label="User Input"
              variant="standard"
              size="small"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
            <MuiButton
              color="primary"
              variant="outlined"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
                width: "100px",
              }}
              onClick={applyFilter}
            >
              <FilterAltIcon fontSize="small" />
              <Typography fontSize={12} fontWeight={500} marginLeft={0.5}>
                Filter
              </Typography>
            </MuiButton>
            <Button
              color="secondary"
              onClick={() => {
                setUpdateForm(true);
              }}
              style={{ margin: "0px 10px" }}
            >
              Update Inventory
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                console.log(csvRef.current);
              }}
            >
              <CSVLink
                data={csvData}
                filename="output.csv"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Export CSV
              </CSVLink>
            </Button>
          </Box>
          <Table data={tableData} />
          <Form data={formData} setData={setFormData} update={handleUpdate} />
          <UpdateForm
            display={updateForm}
            setDisplay={setUpdateForm}
            data={tableData}
            handleTableUpdate={(editRows) => {
              setTable({
                ...table,
                rows: table.rows.map((row) => {
                  if (row.id in editRows) {
                    const newRow = {};
                    Object.keys(editRows[row.id]).forEach((key) => {
                      newRow[key] = editRows[row.id][key].value;
                    });
                    newRow.id = row.id;
                    return newRow;
                  }
                  return row;
                }),
              });

              setTableData({
                ...tableData,
                rows: tableData.rows.map((row) => {
                  if (row.id in editRows) {
                    const newRow = {};
                    Object.keys(editRows[row.id]).forEach((key) => {
                      newRow[key] = editRows[row.id][key].value;
                    });
                    newRow.id = row.id;
                    return newRow;
                  }
                  return row;
                }),
              });
            }}
          />
        </Box>
      )}
    </Container>
  );
}
