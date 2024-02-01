import * as React from "react";


import ModeratorLeft from "../moderatorLeft/ModeratorLeft";
import ModeratorRight from "../moderatorRight/ModeratorRight";
import ModeratorSelect from "../moderatorSelect/ModeratorSelect";

import AddModerator from "../addModerator/AddModerator";
import EditModerator from "../editModerator/editModerator";

import { SnackbarProvider, useSnackbar } from "notistack";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserIdContext";
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
        <AddModerator
          snack={() =>
            handleClickVariant("success", "add", "Moderator Has been Added")
          }
        />
      ) 
      : anchor === "edit" ? (
        <EditModerator
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
  const { moderatorId, change } = useContext(UserContext);
  const checkActive = () => {
    moderatorId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    checkActive();
  }, [moderatorId, change]);
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
        
        <div className="content flex w-[80vw]">
          <ModeratorLeft add={toggleDrawer("add", true)} />

          {active ? (
            <ModeratorRight
              edit={toggleDrawer("edit", true)}
              //pay={toggleDrawer("pay", true)}
            />
          ) : (
            <ModeratorSelect />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Moderator = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};


export default Moderator;
