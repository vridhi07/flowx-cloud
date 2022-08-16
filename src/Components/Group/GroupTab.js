import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Label from "@mui/material/FormLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import InputBox from "../common/InputBox";
import { db } from "../../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.color.lightBlack,
    fontWeight: 900,
  },
  tableHead: {
    backgroundColor: theme.color.darkGrey,
  },
  selectedCheckbox: {
    color: `${theme.color.blue} !important`,
    borderRadius: 3,
  },
  checkbox: {
    color: theme.color.greyLight,
  },
  editIcon: {
    color: theme.color.greyLight,
    cursor: "pointer",
  },
  dropdown: {
    width: "159px",
    height: "28px",
    border: "1px solid gray",
    borderRadius: "6px",
  },
}));
function createData(id, firstName, lastName, email, reports) {
  return {
    id,
    firstName,
    lastName,
    email,
    reports,
  };
}

const rows = [
];

const headCells = [
  {
    id: "#",
    numeric: true,
    disablePadding: true,
    label: "#",
  },
  {
    id: "firstName",
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastName",
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "reports",
    disablePadding: false,
    label: "Report",
  },
  {
    id: "action",
    label: "",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  const classes = useStyles();
  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            classes={{
              checked: classes.selectedCheckbox,
              root: classes.checkbox,
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"center"}>
            <Label className={classes.label}>{headCell.label}</Label>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TableCellData = (props) => {
  const { isEdit, text, id, fieldName, handleChange, type } = props;
  const classes = useStyles();
  return !isEdit ? (
    text
  ) : type === "input" ? (
    <InputBox value={text} onChange={(e) => handleChange(e, fieldName, id)} />
  ) : type === "select" && fieldName === "role" ? (
    <select
      onChange={(e) => handleChange(e, fieldName, id)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={classes.dropdown}
    >
      <option value="">Super Admin</option>
      <option>Admin</option>
      <option>Team</option>
      <option>Participant</option>
    </select>
  ) : type === "select" && fieldName === "reports" ? (
    <select
      onChange={(e) => handleChange(e, fieldName, id)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={classes.dropdown}
    >
      <option value="">Organisation</option>
      <option>Leadership</option>
      <option>Team</option>
      <option>Participant</option>
    </select>
  ) : (
    <select
      onChange={(e) => handleChange(e, fieldName, id)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={classes.dropdown}
    >
      <option value="">Team One</option>
      <option>Alfa</option>
      <option>Tech Depth</option>
      <option>Bita</option>
    </select>
  );
};

function GroupTab({
  selected,
  handleSelectAllClick,
  handleSelectedUser,
  handleEdit,
  handleChange,
  isSelected,
  data
 }) {
  const classes = useStyles();
  
  return (
    <div className="mx-3 py-4 ">
      <Box sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 340 }}>
          <Table
            sx={{ minWidth: 750 }}
            size={"medium"}
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
            />

            <TableBody>
              {data.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" className="border-0">
                      <Checkbox
                        classes={{
                          checked: classes.selectedCheckbox,
                          root: classes.checkbox,
                        }}
                        checked={isItemSelected}
                        onClick={(event) => handleSelectedUser(event, row.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="border-0"
                      component="th"
                      id={labelId}
                      scope="row"
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" className="border-0">
                      <TableCellData
                        text={row.firstName}
                        id={row.id}
                        isEdit={row.edit}
                        fieldName="firstName"
                        handleChange={handleChange}
                        type="input"
                      />
                    </TableCell>

                    <TableCell align="center" className="border-0">
                      <TableCellData
                        text={row.lastName}
                        id={row.id}
                        isEdit={row.edit}
                        fieldName="lastName"
                        handleChange={handleChange}
                        type="input"
                      />
                    </TableCell>
                    <TableCell align="center" className="border-0">
                      <TableCellData
                        text={row.email}
                        id={row.id}
                        isEdit={row.edit}
                        fieldName="email"
                        handleChange={handleChange}
                        type="input"
                      />
                    </TableCell>
                    <TableCell align="center" className="border-0">
                      <TableCellData
                        text={row.reports}
                        id={row.id}
                        isEdit={row.edit}
                        fieldName="reports"
                        handleChange={handleChange}
                        type="select"
                      />
                    </TableCell>
                    <TableCell align="center" className="border-0">
                      {!row.edit ? (
                        <div className="d-flex">
                          <EditIcon
                            className={`${classes.editIcon} me-2`}
                            onClick={(e) => handleEdit('edit', row)}
                          />
                          <img
                            src={"/delete-btn.png"}
                            className={`${classes.editIcon} me-2`}
                            onClick={(e) => handleEdit('delete', row)}
                          />
                        </div>
                      ) : (
                        <div className="d-flex">
                          <img
                            src={"/save-btn.png"}
                            className="cursor-pointer me-2"
                            onClick={(e) => handleEdit('save', row)}
                          />
                          <ClearIcon
                            className="text-danger cursor-pointer me-2"
                            onClick={(e) => handleEdit('close',row)}
                          />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
export default GroupTab;
