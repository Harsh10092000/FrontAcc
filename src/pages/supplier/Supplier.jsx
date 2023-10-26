import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SupLeft from "../../components/supplier/supLeft/SupLeft";
import SupRight from "../../components/supplier/supRight/SupRight";
import SupplierSelect from "../../components/supplier/supplierSelect/SupplierSelect";
import { UserContext } from "../../context/UserIdContext";
import { Box, Drawer } from "@mui/material";
import AddSupplier from "../../components/supplier/addSupplier/AddSupplier";
import EditSup from "../../components/supplier/editSup/EditSup";
import PaySup from "../../components/supplier/paySup/PaySup";
import ReceiveSup from "../../components/supplier/receiveSup/ReceiveSup";
import { useSnackbar, SnackbarProvider } from "notistack";
import EditPay from "../../components/supplier/editPay/EditPay";
import EditReceive from "../../components/supplier/editReceive/EditReceive";

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
  const handleClickVariant1 = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };
  const list = (anchor) => (
    <Box sx={{ width: 400 }} role="presentation">
      {anchor === "add" ? (
        <AddSupplier
          snack={() =>
            handleClickVariant("success", "add", "Supplier Has been Added")
          }
        />
      ) : anchor === "edit" ? (
        <EditSup
          snack={() =>
            handleClickVariant("success", "edit", "Deleted Successfully")
          }
          snacku={() =>
            handleClickVariant("success", "edit", "Updated Successfully")
          }
        />
      ) : anchor === "pay" ? (
        <PaySup
          snack={() =>
            handleClickVariant("success", "pay", "Paid Entry has been entered")
          }
        />
      ) : anchor === "receive" ? (
        <ReceiveSup
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
        ""
      )}
    </Box>
  );

  const [active, setActive] = useState(false);
  const { supId } = useContext(UserContext);
  const update = () => {
    supId > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    update();
  }, [supId]);

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
      <div className="supplier">
        <Navbar />
        <div className="scontent flex">
          <SupLeft add={toggleDrawer("add", true)} />
          {active ? (
            <SupRight
              edit={toggleDrawer("edit", true)}
              pay={toggleDrawer("pay", true)}
              receive={toggleDrawer("receive", true)}
              editPay={toggleDrawer("editPay", true)}
              editReceive={toggleDrawer("editReceive", true)}
              snack={() =>
                handleClickVariant1(
                  "error",
                  "This feature is not available right now"
                )
              }
            />
          ) : (
            <SupplierSelect />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Supplier = () => {
  return (
    <SnackbarProvider maxSnack={2}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default Supplier;
