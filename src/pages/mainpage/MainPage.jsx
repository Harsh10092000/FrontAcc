import * as React from "react";
import { useState } from "react";
import MainLeft from "../../components/mainpage/mainLeft/MainLeft";
import MainRight from "../../components/mainpage/mainRight/MainRight";
import Navbar from "../../components/navbar/Navbar";
import SelectCustomer from "../../components/mainpage/selectCustomer/SelectCustomer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddCustomer from "../../components/mainpage/addCustomer/AddCustomer";
import Pay from "../../components/mainpage/pay/Pay";
import Receive from "../../components/mainpage/receive/Receive";
import Edit from "../../components/mainpage/edit/Edit";
import { useEffect } from "react";
import { UserContext } from "../../context/UserIdContext";
import { useContext } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import EditPay from "../../components/mainpage/editPay/EditPay";
import EditReceive from "../../components/mainpage/editReceive/EditReceive";

const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    add: false,
    edit: false,
    pay: false,
    receive: false,
    editPay: false,
    editReceive: false,
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
        <AddCustomer
          snack={() =>
            handleClickVariant("success", "add", "Customer Has been Added")
          }
        />
      ) : anchor === "edit" ? (
        <Edit
          snack={() =>
            handleClickVariant("success", "edit", "Deleted Successfully")
          }
          snacku={() =>
            handleClickVariant("success", "edit", "Updated Successfully")
          }
        />
      ) : anchor === "pay" ? (
        <Pay
          snack={() =>
            handleClickVariant("success", "pay", "Paid Entry has been entered")
          }
        />
      ) : anchor === "receive" ? (
        <Receive
          snack={() =>
            handleClickVariant(
              "success",
              "receive",
              "Received Entry has been entered"
            )
          }
        />
      ) : anchor === "editPay" ? (
        <EditPay
          snackd={() =>
            handleClickVariant("success", "editPay", "Deleted Successfully")
          }
          snacku={() =>
            handleClickVariant("success", "editPay", "Updated Successfully")
          }
        />
      ) : anchor === "editReceive" ? (
        <EditReceive
          snackd={() =>
            handleClickVariant("success", "editReceive", "Deleted Successfully")
          }
          snacku={() =>
            handleClickVariant("success", "editReceive", "Updated Successfully")
          }
        />
      ) : (
        "-"
      )}
    </Box>
  );
  const [active, setActive] = useState(false);
  const { userId, change } = useContext(UserContext);
  const checkActive = () => {
    userId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    checkActive();
  }, [userId, change]);
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
        open={state["pay"]}
        onClose={toggleDrawer("pay", false)}
      >
        {list("pay")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["receive"]}
        onClose={toggleDrawer("receive", false)}
      >
        {list("receive")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["editPay"]}
        onClose={toggleDrawer("editPay", false)}
      >
        {list("editPay")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["editReceive"]}
        onClose={toggleDrawer("editReceive", false)}
      >
        {list("editReceive")}
      </Drawer>
      <div className="mainpage">
        <Navbar />
        <div className="content flex">
          <MainLeft add={toggleDrawer("add", true)} />

          {active ? (
            <MainRight
              edit={toggleDrawer("edit", true)}
              pay={toggleDrawer("pay", true)}
              receive={toggleDrawer("receive", true)}
              editPay={toggleDrawer("editPay", true)}
              editReceive={toggleDrawer("editReceive", true)}
            />
          ) : (
            <SelectCustomer />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const MainPage = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default MainPage;
