import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Label from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import InputBox from "../common/InputBox";
import { db } from "../../firebaseConfig";
import DeleteUser from "../Group/deleteUser";
import { Tune } from "@mui/icons-material";
import axios from "axios";
import getName from "../../Utils/getName";
import SentConfirmationModal from "./sendConfirmationModal";

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
    width: "100px",
    height: "28px",
    border: "1px solid gray",
    borderRadius: "6px",
  },
  tableCellDatas: {
    padding: "0px 5px !important",
  },
  emailBox: {
    width: "100px !important",
  },
}));
function createData(id, firstName, lastName, email, team, role, reports) {
  return {
    id,
    firstName,
    lastName,
    email,
    team,
    role,
    reports,
  };
}

const rows = [
  createData(
    1,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Admin",
    "Leadership"
  ),
  createData(
    2,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Admin",
    "Leadership"
  ),
  createData(
    3,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Super Admin",
    "Leadership"
  ),
  createData(
    4,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Admin",
    "Leadership"
  ),
  createData(
    5,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Team",
    "Leadership"
  ),
  createData(
    6,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Admin",
    "Leadership"
  ),
  createData(
    7,
    "Alex",
    "Barrow",
    "aBarrow@gmail.com",
    "TeamOne",
    "Admin",
    "Leadership"
  ),
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
    id: "team",
    disablePadding: false,
    label: "Team",
  },
  {
    id: "role",
    disablePadding: false,
    label: "Role",
  },
  {
    id: "reports",
    disablePadding: false,
    label: "Reports",
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
  const { addNewMember, isEdit, text, id, fieldName, handleChange, type } =
    props;
  const classes = useStyles();

  return !isEdit ? (
    text
  ) : type === "input" &&
    (fieldName === "firstName" ||
      fieldName === "lastName" ||
      addNewMember === true) ? (
    <InputBox value={text} onChange={(e) => handleChange(e, fieldName, id)} />
  ) : type === "select" && fieldName === "role" ? (
    <select
      onChange={(e) => handleChange(e, fieldName, id)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={classes.dropdown}
    >
      <option>Super Admin</option>
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
      <option>Leadership</option>
    </select>
  ) : type === "input" && fieldName === "email" && addNewMember === false ? (
    text
  ) : (
    <select
      onChange={(e) => handleChange(e, fieldName, id)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={classes.dropdown}
    >
      <option>Partnerships</option>
      <option>Developers</option>
      <option>HR</option>
    </select>
  );
};

function OriganisationTab({
  addParticipateRow,
  handleCloseRow,
  handleUpdateUserDetails,
  orgName,
  allOrgUserList,
  handleUpdateUserDetailsFromTeam,
}) {
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const [data, setData] = useState([]);
  const [deletePopupStatus, setDeletePopupStatus] = useState(false);
  const [userValidation, setUserValidation] = useState("");
  const [sentEmailStatus, setSentEmailStatus] = useState(false);

  useEffect(() => {
    if (addParticipateRow) {
      let userDetails = {
        edit: true,
        email: " ",
        firstName: "",
        id: "",
        lastName: "",
        reports: "Leadership",
        role: "Participant",
        team: "Developers",
      };
      let updateData = [...data];
      updateData.push(userDetails);
      setData(updateData);
    }
  }, [addParticipateRow]);
  useEffect(() => {
    let newData = [];
    if (allOrgUserList.length > 0) {
      allOrgUserList.forEach((row, i) => {
        newData.push({ ...row, edit: false });
      });
      setData(newData);
    }
  }, [allOrgUserList]);

  const classes = useStyles();
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChange = (e, fieldName, id) => {
    setData(
      data.map((row, i) => {
        if (row.id === id) {
          return {
            ...row,
            [fieldName]: e.target.value,
          };
        } else {
          return row;
        }
      })
    );
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleEdit = async (action, value) => {
    let orgData = await db
      .collection("Organisation")
      .where(`organisationInfo.Name`, "==", `${orgName.Name}`)
      .get();
    let orgId = orgData.docs[0].id;

    if (action == "edit" || action == "close") {
      if (value.id) {
        setData(
          data.map((row, i) => {
            if (value.id === row.id) {
              return { ...row, edit: !row.edit };
            } else {
              return row;
            }
          })
        );
      } else {
        let fiteredData = data.filter((val) => val.id !== "");
        setData(fiteredData);
        handleCloseRow();
        setUserValidation("");
      }
    } else if (action == "save") {
      if (value.id) {
        let updatedDetails = delete value["edit"];
        await db
          .collection("Organisation")
          .doc(orgId)
          .collection(value.team)
          .doc(value.id)
          .set(value)
          .then(() => {})
          .catch((error) => {});

        await db
          .collection("Users")
          .doc(value.id)
          .update({ "userInfo.Name": `${value.firstName} ${value.lastName}` })
          .then(() => {})
          .catch((error) => {});

        setData(
          data.map((row, i) => {
            if (value.id === row.id) {
              return { ...row, edit: !row.edit };
            } else {
              return row;
            }
          })
        );
        handleUpdateUserDetails();
      } else {
        let dwdfew = await db
          .collection("Users")
          .where(`userInfo.Email`, "==", `${value.email.trim()}`)
          .get();
        let userInfo = dwdfew?.docs[0]?.data()?.userInfo;
        let userId = dwdfew?.docs[0]?.id;
        if (userId) {
          handleInviteUser(value, userId);
        } else {
          setUserValidation("Invalid user");
        }
      }
    } else {
      let userList = [];
      userList.push(value.id);
      setSelected(userList);
      setDeletePopupStatus(true);
      // let user_query = db
      //   .collection("Organisation")
      //   .doc(orgId)
      //   .collection(value.team)
      //   .where(`id`, "==", value.id);
      //   user_query.get().then(function (querySnapshot) {
      //     querySnapshot.forEach(function (doc) {
      //       doc.ref.delete();
      //     });
      //   });
      //   handleUpdateUserDetails();
    }
  };

  const organisationName = (orgNameValue) => {
    let orgNameList = getName(orgNameValue);
    if (orgNameList?.length > 1) {
      return `${orgNameList[0]}%20${orgNameList[1]}`;
    } else {
      return orgNameList;
    }
  };

  const handleInviteUser = async (value, userId) => {
    let teamUserCollection = await db
      .collection("Organisation")
      .doc("ke0z1G4lACIj3rbQRXQi")
      .collection(value.team)
      .where("id", "==", userId)
      .get();

    if (teamUserCollection?.docs[0]?.data().invitationStatus === "accepted") {
      setUserValidation("you are already added in this group");
    } else {
      axios({
        method: "post",
        url: "https://us-central1-flowx-2be91.cloudfunctions.net/sendEmail",
        data: {
          email: value.email,
          name: value.firstName + value.lastName,
          message: "Successfuly message sent!",
          url: `${`https://flowx-2be91.web.app/invitation?orgId=ke0z1G4lACIj3rbQRXQi&orgName=${organisationName(
            orgName.Name
          )}&team=${value.team}&role=${value.role}&name=${
            value.firstName
          }&id=${userId}`}`,
        },
      }).then(
        (response) => {
          if (response?.data?.status == "200") {
            setSentEmailStatus(true);
          }
        },
        (error) => {}
      );

      await db
        .collection("Organisation")
        .doc("ke0z1G4lACIj3rbQRXQi")
        .collection(value.team)
        .doc(userId)
        .set({
          email: value.email,
          id: userId,
          firstName: value.firstName,
          lastName: value.lastName,
          team: value.team,
          role: value.role,
          reports: value.reports,
          invitationStatus: "sent",
        })
        .then((data) => {})
        .catch((error) => {});

      setData(
        data.map((row, i) => {
          if (row.id == "") {
            return { ...row, edit: !row.edit, id: userId };
          } else {
            return row;
          }
        })
      );
      setUserValidation(" ");
      handleCloseRow();
      handleUpdateUserDetails();
    }
  };

  const handleCloseDeleteUserBox = () => {
    setDeletePopupStatus(false);
  };

  const handleCloseEmailBox = () => {
    setSentEmailStatus(false);
  };

  return (
    <div className="mx-3 py-4 ">
      {deletePopupStatus && (
        <DeleteUser
          deleteUserBox={deletePopupStatus}
          handleCloseDeleteUserBox={handleCloseDeleteUserBox}
          handleUpdateUserDetailsFromTeam={handleUpdateUserDetailsFromTeam}
          selected={selected}
          orgName={orgName}
        />
      )}
      {sentEmailStatus && (
        <SentConfirmationModal
          sentEmailStatus={sentEmailStatus}
          handleCloseEmailBox={handleCloseEmailBox}
        />
      )}
      {data.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.length}
              />

              <TableBody>
                {addParticipateRow && (
                  <>
                    {data.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      if (!row.id) {
                        return (
                          <>
                            <TableRow
                              hover
                              role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.id}
                              // selected={isItemSelected}
                            >
                              <TableCell
                                padding="checkbox"
                                className="border-0 "
                              >
                                <Checkbox
                                  classes={{
                                    checked: classes.selectedCheckbox,
                                    root: classes.checkbox,
                                  }}
                                  // checked={isItemSelected}
                                  onClick={(event) =>
                                    handleClick(event, row.id)
                                  }
                                />
                              </TableCell>
                              <TableCell
                                className="border-0"
                                component="th"
                                id=""
                                scope="row"
                                align="center"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                align="center"
                                className={
                                  row.edit
                                    ? `border-0 ${classes.tableCellDatas}`
                                    : "border-0"
                                }
                              >
                                <TableCellData
                                  text={row.firstName}
                                  id=""
                                  isEdit={row.edit}
                                  fieldName="firstName"
                                  handleChange={handleChange}
                                  type="input"
                                />
                              </TableCell>

                              <TableCell
                                align="center"
                                className={
                                  row.edit
                                    ? `border-0 ${classes.tableCellDatas}`
                                    : "border-0"
                                }
                              >
                                <TableCellData
                                  text={row.lastName}
                                  id=""
                                  isEdit={row.edit}
                                  addNewMember={true}
                                  fieldName="lastName"
                                  handleChange={handleChange}
                                  type="input"
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                className={
                                  row.edit
                                    ? `border-0 ${classes.tableCellDatas}`
                                    : "border-0"
                                }
                              >
                                <TableCellData
                                  text={row.email}
                                  id=""
                                  isEdit={row.edit}
                                  fieldName="email"
                                  addNewMember={true}
                                  handleChange={handleChange}
                                  type="input"
                                />
                                {userValidation ? (
                                  <div className="text-center text-danger">
                                    {userValidation}
                                  </div>
                                ) : null}
                              </TableCell>
                              <TableCell
                                align="center"
                                className={
                                  row.edit
                                    ? `border-0 ${classes.tableCellDatas}`
                                    : "border-0"
                                }
                              >
                                <TableCellData
                                  text={row.team}
                                  id=""
                                  isEdit={row.edit}
                                  fieldName="team"
                                  handleChange={handleChange}
                                  type="select"
                                />
                              </TableCell>
                              <TableCell
                                align="center"
                                className={
                                  row.edit
                                    ? `border-0 ${classes.tableCellDatas}`
                                    : "border-0"
                                }
                              >
                                <TableCellData
                                  text={row.role}
                                  id=""
                                  isEdit={row.edit}
                                  fieldName="role"
                                  handleChange={handleChange}
                                  type="select"
                                />
                              </TableCell>
                              <TableCell align="center" className="border-0">
                                <TableCellData
                                  text={row.reports}
                                  id=""
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
                                      onClick={(e) => handleEdit("edit", row)}
                                    />
                                    <img
                                      src={"/delete-btn.png"}
                                      className={`${classes.editIcon} me-2`}
                                      onClick={(e) => handleEdit("delete", row)}
                                    />
                                    {row.invitationStatus == "accepted" ? (
                                      <img
                                        // onClick={handleInviteTeam}
                                        src={"/greenEmailIcon.png"}
                                        width="36px"
                                        height="36px"
                                        className={`mx-2 ${classes.editIcon}`}
                                      />
                                    ) : (
                                      <img
                                        // onClick={handleInviteTeam}
                                        src={"/orangeEmailIcon.png"}
                                        width="36px"
                                        height="36px"
                                        className={`mx-2 ${classes.editIcon}`}
                                      />
                                    )}
                                  </div>
                                ) : (
                                  <div className="d-flex">
                                    <img
                                      src={"/save-btn.png"}
                                      className="cursor-pointer me-2"
                                      onClick={(e) => handleEdit("save", row)}
                                    />
                                    <ClearIcon
                                      className="text-danger cursor-pointer me-2"
                                      onClick={(e) => handleEdit("close", row)}
                                    />
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      }
                    })}
                  </>
                )}

                {data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  if (row.id) {
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
                            onClick={(event) => handleClick(event, row.id)}
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
                        <TableCell
                          align="center"
                          className={
                            row.edit
                              ? `border-0 ${classes.tableCellDatas}`
                              : "border-0"
                          }
                        >
                          <TableCellData
                            text={row.firstName}
                            id={row.id}
                            isEdit={row.edit}
                            fieldName="firstName"
                            handleChange={handleChange}
                            type="input"
                          />
                        </TableCell>

                        <TableCell
                          align="center"
                          className={
                            row.edit
                              ? `border-0 ${classes.tableCellDatas}`
                              : "border-0"
                          }
                        >
                          <TableCellData
                            text={row.lastName}
                            id={row.id}
                            isEdit={row.edit}
                            fieldName="lastName"
                            handleChange={handleChange}
                            type="input"
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          className={
                            row.edit
                              ? `border-0 ${classes.tableCellDatas}`
                              : "border-0"
                          }
                        >
                          <TableCellData
                            text={row.email}
                            id={row.id}
                            isEdit={row.edit}
                            fieldName="email"
                            addNewMember={false}
                            handleChange={handleChange}
                            type="input"
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          className={
                            row.edit
                              ? `border-0 ${classes.tableCellDatas}`
                              : "border-0"
                          }
                        >
                          <TableCellData
                            text={row.team}
                            id={row.id}
                            isEdit={row.edit}
                            fieldName="team"
                            handleChange={handleChange}
                            type="select"
                          />
                        </TableCell>
                        <TableCell align="center" className="border-0">
                          <TableCellData
                            text={row.role}
                            id={row.id}
                            isEdit={row.edit}
                            fieldName="role"
                            handleChange={handleChange}
                            type="select"
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
                                className={`${classes.editIcon} mt-2 me-2`}
                                width="40px"
                                height="40px"
                                onClick={(e) => handleEdit("edit", row)}
                              />
                              <img
                                src={"/delete-btn.png"}
                                className={`${classes.editIcon} me-2`}
                                width="30px"
                                height="40px"
                                onClick={(e) => handleEdit("delete", row)}
                              />
                              {row.invitationStatus == "accepted" ? (
                                <img
                                  // onClick={handleInviteTeam}
                                  src={"/greenEmailIcon.png"}
                                  width="45px"
                                  height="45px"
                                  className={`${classes.editIcon}`}
                                />
                              ) : (
                                <img
                                  // onClick={handleInviteTeam}
                                  src={"/orangeEmailIcon.png"}
                                  width="45px"
                                  height="45px"
                                  className={`${classes.editIcon}`}
                                />
                              )}
                            </div>
                          ) : (
                            <div className="d-flex">
                              <img
                                src={"/save-btn.png"}
                                className="cursor-pointer me-2"
                                onClick={(e) => handleEdit("save", row)}
                              />
                              <ClearIcon
                                className="text-danger cursor-pointer me-2"
                                onClick={(e) => handleEdit("close", row)}
                              />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </div>
  );
}
export default OriganisationTab;
