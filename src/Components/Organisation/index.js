import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import OrganisationHead from "./OrganisationHead";
import OriganisationTab from "./OriganisationTab";
import EditIcon from "@mui/icons-material/Edit";
import InputBox from "../common/InputBox";
import ClearIcon from "@mui/icons-material/Clear";
import Group from "../Group";
import { db } from "../../firebaseConfig";
import AddOrganisation from "./addOrganisation";
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles((theme) => ({
  tableHeading: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.color.heading,
  },
  mobileTableHeading : {
    display: "block",
    fontSize: 24,
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

function Organisation({handleSetCreateTeamBox}) {
  const classes = useStyles();
  const [orgName, setOrgName] = useState({
    Name: "",
  });
  const matches = useMediaQuery('(max-width:600px)');
  const [edit, setEdit] = useState("");
  const [addOrgModal, setAddOrgModal] = useState(false);
  const [organisationList, setOrganisationList] = useState({
    id: [],
    data: [],
  });
  const [orgValidation, setOrgValidation] = useState("");
  const [allOrgUserList , setAllOrgUserList] = useState([])
  const [addParticipateRow, setAddParticipateRow] = useState(false)

  const handleOrganisationModal = () => {
    setAddOrgModal(true);
  };
 
  const handleAddParticipate= () => {
    setAddParticipateRow(!addParticipateRow)
  };
  const handleCloseRow = () =>{
    setAddParticipateRow(false)
  }
 

  const getOrganisationList = async () => {
    try {
      let collectionDataList = [];
      let collectionIdList = [];
      let allUserListofOrg = [] ;
      let orgRef = await db.collection("Organisation").get();
      if (orgRef) {
        let xyz = await Promise.all(orgRef.docs.map(async (doc) => {
          collectionIdList.push(doc.id);
          collectionDataList.push(String(doc.data().organisationInfo.Name));

          if (doc.data()?.teamList?.length >= 1) {
             await Promise.all(doc.data()?.teamList.map(async (kl) => {
              let teamCollectionData = await db.collection("Organisation").doc(doc.id).collection(`${kl}`).get();
              if(teamCollectionData.docs[0]){
                 await Promise.all(teamCollectionData.docs.map(async(val) =>{
                 allUserListofOrg = [...allUserListofOrg, val.data()]
                  return await allUserListofOrg
                }))
                return allUserListofOrg
              }
            }))
          }
        }))
      }

      setAllOrgUserList(allUserListofOrg)

      setOrganisationList({
        ...organisationList,
        id: collectionIdList,
        data: collectionDataList,
      });
      let selectedOrg = orgRef.docs.filter(doc => doc.id == 'ke0z1G4lACIj3rbQRXQi')[0].data()

      setOrgName({ ...orgName, Name: selectedOrg.organisationInfo.Name });

    } catch (error) {
      console.log(error);
      // <Error statusCode={error} />;
    }
  };

  useEffect(() => {
    getOrganisationList();
  }, []);
  const handleOrganisationName = async () => {
    // db.collection("Organisation")
    //   .add({
    //     organisationInfo: orgName,
    //     GroupList : []
    //   })
    //   .then((data) => {
    //     console.log(data.id,"Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    let organisationInfo = {
      Name: orgName.Name,
    };
    db.collection("Organisation")
      .doc("ke0z1G4lACIj3rbQRXQi")
      .update({
        organisationInfo: organisationInfo,
      })
      .then(() => {
        console.log("updated organization successfully !");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    getOrganisationList();
    setEdit("");
  };

  const handleAddOrganisation = async () => {
    const orgCollectionList = await db
          .collection("Organisation")
          .where(`organisationInfo.Name`, "==", `${orgName.Name}`)
          .get();
    if (!orgCollectionList?.docs?.length) {
      db.collection("Organisation")
        .add({
          organisationInfo: orgName,
          teamList: [],
        })
        .then((data) => {
          console.log(data.id, "Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      setAddOrgModal(false);
    } else {
      setOrgValidation(`${orgName.Name} already exist`);
    }
  };

  const handleChangeOrgName = (e) => {
    setOrgName({ ...orgName, Name: e.target.value });
  };
  const handleCloseAddOrgModel = () => {
    setAddOrgModal(false);
    setOrgValidation("");
  };

  const handleUpdateUserDetails = () =>{
    getOrganisationList();
  }

  const handleUpdateUserDetailsFromTeam = () =>{
    getOrganisationList();
  }
 

  return (
    <div >
      {addOrgModal ? (
        <AddOrganisation
          orgValidation={orgValidation}
          handleCloseAddOrgModel={handleCloseAddOrgModel}
          handleChangeOrgName={handleChangeOrgName}
          handleAddOrganisation={handleAddOrganisation}
          modalStatus={addOrgModal}
        />
      ) : null}
      <OrganisationHead />
      <div className={matches ? classes.mobileTableHeading :classes.tableHeading }>
        <div className="d-flex align-items-center">
          <div>
            <span>Organisation </span>{" "}
            {!edit ? (
              orgName.Name
            ) : (
              <InputBox
                value={orgName.Name}
                onChange={(e) =>
                  setOrgName({ ...orgName, Name: e.target.value })
                }
                className="mx-2"
              />
            )}
          </div>
          {!edit ? (
            <>
              {orgName.Name ? (
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => setEdit("edit")}
                />
              ) : (
                <img
                  onClick={() => setEdit("add")}
                  className={classes.editIcon}
                  src={"/openIcon.png"}
                  alt="openIcon"
                  height={30}
                  width={30}
                 />
              )}
            </>
          ) : (
            <div className="d-flex">
              {edit == "add" ? (
                <img
                  src={"/save-btn.png"}
                  className={`${classes.editIcon} me-2`}
                  onClick={handleOrganisationName}
                />
              ) : edit == "edit" ? (
                <img
                  src={"/updated.png"}
                  className={`${classes.editIcon} me-2`}
                  height={30}
                  width={30}
                  onClick={handleOrganisationName}
                />
              ) : null}
              <ClearIcon
                className="text-danger cursor-pointer me-2"
                onClick={() => setEdit("")}
              />
            </div>
          )}
        </div>
        <div>
          <img
            onClick={handleOrganisationModal}
            src={"/orgIcon.png"}
            width="60px"
            height="60px"
            className={`mx-2 ${classes.iconsList}`}
          />
          <img
            onClick={handleAddParticipate}
            src={"/add_user_btn.png"}
            width="36px"
            height="36px"
            className={`mx-2 ${classes.iconsList}`}
          />
          <img
            // onClick={handleCreateTeam}
            onClick={() =>handleSetCreateTeamBox(organisationList,orgName ,3)}
            src={"/add-group-btn.png"}
            width="36px"
            height="36px"
            className={`mx-2 ${classes.iconsList}`}
          />
          
        </div>
      </div>
     
        
      
        <OriganisationTab handleCloseRow={handleCloseRow} addParticipateRow={addParticipateRow} handleUpdateUserDetailsFromTeam={handleUpdateUserDetailsFromTeam} handleUpdateUserDetails={handleUpdateUserDetails} orgName={orgName} allOrgUserList={allOrgUserList}/>
    </div>
  );
}
export default Organisation;
