import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import StaffLeft from "../../components/staff/staffLeft/StaffLeft";
import StaffRight from "../../components/staff/staffRight/StaffRight";
import StaffSelect from "../../components/staff/staffSelect/StaffSelect";
import AddStaff from "../../components/staff/addStaff/AddStaff";
import EditStaff from "../../components/staff/editStaff/EditStaff";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserIdContext";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    add: false,
    edit: false,
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
    // variant could be success, error, warning, info, or default
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };
  const list = (anchor) => (
    <Box sx={{ width: 400 }} role="presentation">
      {anchor === "add" ? (
        <AddStaff
          snack={() =>
            handleClickVariant("success", "add", "Staff Has been Added")
          }
        />
      ) 
      : anchor === "edit" ? (
        <EditStaff
          // snack={() =>
          //   handleClickVariant("success", "edit", "Deleted Successfully")
          // }
          snacku={() =>
            handleClickVariant("success", "edit", "Updated Successfully")
          }
        />
      )  
      : (
        "-"
      )}
    </Box>
  );
  const [active, setActive] = useState(false);
  const { staffId, change } = useContext(UserContext);
  const checkActive = () => {
    staffId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    checkActive();
  }, [staffId, change]);
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
      
      
      <div className="mainpage">
        <Navbar />
        <div className="content flex">
          <StaffLeft add={toggleDrawer("add", true)} />

          {active ? (
            <StaffRight
              edit={toggleDrawer("edit", true)}
              pay={toggleDrawer("pay", true)}
            />
          ) : (
            <StaffSelect />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Staff = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};


export default Staff;
