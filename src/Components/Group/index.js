import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import GroupHead from "./GroupHead";
import GroupTab from "./GroupTab";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";
import InputBox from "../common/InputBox";
import ClearIcon from "@mui/icons-material/Clear";
import { db } from "../../firebaseConfig";
import Participate from "../Participent";
import AddTeam from "./addTeam";
import DeleteUser from "./deleteUser";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F1F4F5",
    paddingLeft: "30px",
    minHeight: "100vh",
  },
  tableHeading: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.color.heading,
  },
  editIcon: {
    color: theme.color.greyLight,
    marginLeft: 9,
    cursor: "pointer",
  },
  iconsList: {
    cursor: "pointer",
  },
}));

function Group({ orgName, handleBackOrganization, organisationList }) {
  const classes = useStyles();
  const [groupName, setGroupName] = useState("Developers");
  const [edit, setEdit] = useState(false);
  const [participentBox, setParticipentBox] = useState(false);
  const [addTeamBox, setAddTeamBox] = useState(false);
  const [deleteUserBox, setDeleteUserBox] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleAddParticipate = () => {
    setParticipentBox(!participentBox);
  };

  const getOrganisationUserData = async () => {
    try {
      let allUserListofOrg = [];
      let orgRef = await db.collection("Organisation").get();
      if (orgRef) {
        let xyz = await Promise.all(
          orgRef.docs.map(async (doc) => {
            if (doc.data()?.teamList?.length >= 1) {
              await Promise.all(
                doc.data()?.teamList.map(async (kl) => {
                  let teamCollectionData = await db
                    .collection("Organisation")
                    .doc(doc.id)
                    .collection(`${kl}`)
                    .get();
                  if (teamCollectionData.docs[0]) {
                    await Promise.all(
                      teamCollectionData.docs.map(async (val) => {
                        allUserListofOrg = [...allUserListofOrg, val.data()];
                        return await allUserListofOrg;
                      })
                    );
                    return allUserListofOrg;
                  }
                })
              );
            }
          })
        );
      }
      let filterUsers = allUserListofOrg.filter(
        (val) => val.team == "Developers"
      );
      setData(filterUsers);
    } catch (error) {
      // <Error statusCode={error} />;
    }
  };

  useEffect(() => {
    getOrganisationUserData();
  }, []);

  const handleSaveGroupName = async () => {
    let perviousData = await db
      .collection("Organisation")
      .doc(organisationList.id[1])
      .get();
    let newCollectionList = perviousData.data();
    // let collectionDetails = { name: orgName, };
    newCollectionList.temaList.push(groupName);
    db.collection("Organisation")
      .doc(organisationList.id[1])
      .update(newCollectionList);

    // db.collection("Organisation")
    //   .doc(organisationList.id[0])
    //   .collection(orgName)
    //   .add({
    //     teamName: orgName,
    //   })
    //   .then((data) => {
    //     let newCollectionList = perviousData.data();
    //     let collectionDetails = {
    //       // id: data.id,
    //       name: orgName,
    //     };
    //     newCollectionList.collectionList.push(collectionDetails);
    //     db.collection("Organisation")
    //       .doc(organisationList.id[0])
    //       .update(newCollectionList);
    //     console.log(data.get(), "Document successfully written");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
    setEdit(false);
  };

  const handleCloseAddInvitationBox = () => {
    setParticipentBox(false);
  };
  const handleCloseAfterAddGroup = () => {
    setParticipentBox(false);
  };

  const handleAddTeam = () => {
    setAddTeamBox(true);
  };

  const handleCloseAddGroup = () => {
    setAddTeamBox(false);
  };
  const handleCloseDeleteUserBox = () => {
    setDeleteUserBox(false);
  };

  const handleUpdateUserDetailsFromTeam = () => {
    getOrganisationUserData();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectedUser = (event, id) => {
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
      setData(
        data.map((row, i) => {
          if (value.id === row.id) {
            return { ...row, edit: !row.edit };
          } else {
            return row;
          }
        })
      );
    } else if (action == "save") {
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
      handleUpdateUserDetailsFromTeam();
    } else {
      let user_query = db
        .collection("Organisation")
        .doc(orgId)
        .collection(value.team)
        .where(`id`, "==", value.id);
      user_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      handleUpdateUserDetailsFromTeam();
    }
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

  const handleDeleteUser = async () => {
    setDeleteUserBox(true);
    //   let orgData = await db
    //   .collection("Organisation")
    //   .where(`organisationInfo.Name`, "==", `${orgName.Name}`)
    //   .get();
    //  let orgId = orgData.docs[0].id;
    //   selected.map(val =>{
    //     let user_query = db.collection("Organisation").doc(orgId).collection('Developers').where(`id`, "==", val);
    //       user_query.get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //           doc.ref.delete();
    //         });
    //       });
    //       handleUpdateUserDetailsFromTeam()
    //   })
  };

  return (
    <>
      {deleteUserBox && (
        <DeleteUser
          deleteUserBox={deleteUserBox}
          handleCloseDeleteUserBox={handleCloseDeleteUserBox}
          handleUpdateUserDetailsFromTeam={handleUpdateUserDetailsFromTeam}
          selected={selected}
          orgName={orgName}
        />
      )}
      {participentBox && (
        <Participate
          handleCloseAfterAddGroup={handleCloseAfterAddGroup}
          handleCloseAddInvitationBox={handleCloseAddInvitationBox}
          participentBox={participentBox}
          orgName={orgName}
          groupName={groupName}
        />
      )}
      {addTeamBox && (
        <AddTeam
          organisationList={organisationList}
          orgName={orgName}
          addTeamBox={addTeamBox}
          handleCloseAddGroup={handleCloseAddGroup}
        />
      )}
      <div className={classes.root}>
        <GroupHead handleBackOrganization={handleBackOrganization} />
        <div className={`mx-3 ${classes.tableHeading}`}>
          <div className="d-flex align-items-center">
            <div>
              <span>Team </span>{" "}
              {!edit ? (
                groupName
              ) : (
                <InputBox
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mx-2"
                />
              )}
            </div>
            {!edit ? (
              <EditIcon
                className={classes.editIcon}
                onClick={() => setEdit(true)}
              />
            ) : (
              <div className="d-flex">
                <img
                  src={"/save-btn.png"}
                  className="cursor-pointer me-2"
                  onClick={handleSaveGroupName}
                />
                <ClearIcon
                  className="text-danger cursor-pointer me-2"
                  onClick={(e) => setEdit(false)}
                />
              </div>
            )}
          </div>
          <div>
            <img
              onClick={handleAddParticipate}
              src={"/add-user-btn.png"}
              width="36px"
              height="36px"
              className={`mx-2 ${classes.iconsList}`}
            />
            <img
              onClick={handleAddTeam}
              src={"/add-group-btn.png"}
              width="36px"
              height="36px"
              className={`mx-2 ${classes.iconsList}`}
            />
            <img
              onClick={handleDeleteUser}
              src={"/invitebtn.png"}
              width="36px"
              height="36px"
              className={`mx-2 ${classes.iconsList}`}
            />
          </div>
        </div>

        <GroupTab
          groupName={groupName}
          selected={selected}
          handleSelectAllClick={handleSelectAllClick}
          handleSelectedUser={handleSelectedUser}
          handleEdit={handleEdit}
          handleChange={handleChange}
          isSelected={isSelected}
          data={data}
        />
      </div>
    </>
  );
}
export default Group;
