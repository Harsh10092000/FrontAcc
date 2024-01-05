import React, { useEffect, useState, useContext } from "react";
import { Box, TextField } from "@mui/material";
import { AddPaymentPlan } from "../../components/admin/addpaymentPlan/AddPaymentPlan";
import Admin from "./Admin";
import { useSnackbar } from "notistack"
import {EditPaymentPlan} from "../../components/admin/editpaymentPlan/EditPaymentPlan";
import Drawer from "@mui/material/Drawer";
import { AddHsnCode } from "../../components/admin/addHsnCode/AadHsnCode";
import { AddSacCode } from "../../components/admin/addSacCode/AddSacCode";
const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    add: false,
    edit: false,
    addhsn: false,
    addsac: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggleDrawer1 = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClickVariant = (variant, anchor1, msg) => {
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };

  const list = (anchor) => (
    <Box sx={{ width: 400 }} role="presentation">
      {anchor === "add" ? (
        <AddPaymentPlan
          snack={() =>
            handleClickVariant("success", "add", "Hsn Code Has been Added")
          }
        />
      ) : anchor === "edit" ? (
        <EditPaymentPlan
          snack={() =>
            handleClickVariant("success", "edit", "Deleted Successfully")
          }
          
        />
      ) : anchor === "addhsn" ? (
        <AddHsnCode
          snack={() =>
            handleClickVariant("success", "addhsn", "Deleted Successfully")
          }
        />
      ) : anchor === "addsac" ? (
        <AddSacCode
          snack={() =>
            handleClickVariant("success", "addsac", "Deleted Successfully")
          }
        />
      ) : (
        "-"
      )}
    </Box>
  );
//   const [active, setActive] = useState(false);
//   const { userId, change } = useContext(UserContext);
//   const checkActive = () => {
//     userId === 0 ? setActive(false) : setActive(true);
//   };
//   useEffect(() => {
//     checkActive();
//   }, [userId, change]);

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["add"]}
        onClose={toggleDrawer("add", false)}
      >
        {list("add")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["edit"]}
        onClose={toggleDrawer("edit", false)}
      >
        {list("edit")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["addhsn"]}
        onClose={toggleDrawer("addhsn", false)}
      >
        {list("addhsn")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["addsac"]}
        onClose={toggleDrawer("addsac", false)}
      >
        {list("addsac")}
      </Drawer>
      <div className="mainpage">
        {/* <Navbar /> */}
        <div className="content flex">
            <Admin
              edit={toggleDrawer("edit", true)}
              add={toggleDrawer("add", true)}
              addhsn={toggleDrawer("addhsn", true)}
              addsac={toggleDrawer("addsac", true)}
            />
        </div>
      </div>
    </React.Fragment>
  );
};

const Admin1 = () => {
    return (
      
        <MyApp />
      
    );
  };

export default Admin1;
