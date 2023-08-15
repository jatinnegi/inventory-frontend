import Action from "../components/Action";

export function parseData(rows, handleEdit, handleDelete) {
  const columns = getColumns(rows);
  const tableRows = [];
  const tableColumns = [];

  for (let i = 0; i < rows.length; i++) {
    let row = { id: i + 1 };

    Object.keys(columns).forEach((key) => {
      if (rows[i][key] && rows[i][key].toString().length > columns[key])
        columns[key] = rows[i][key].toString().length;

      row = { ...row, [key]: rows[i][key] };
    });

    tableRows.push(row);
  }

  Object.keys(columns).forEach((key) => {
    const columnWidth = Math.max(
      columns[key] * 13,
      key.toString().length * 13,
      70
    );

    tableColumns.push({
      field: key,
      name: key,
      width: columnWidth,
    });
  });

  tableColumns.push({
    field: "Actions",
    name: "Actions",
    sortable: false,
    width: 70,
    renderCell: (params) => (
      <Action
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        params={params}
      />
    ),
  });

  return [tableColumns, tableRows];
}

export function getColumns(rows) {
  const columns = {};

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    Object.keys(row).forEach((key) => {
      if (!(key in columns)) columns[key] = 0;
    });
  }

  return columns;
}
