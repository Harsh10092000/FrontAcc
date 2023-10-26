import React, { useContext, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import CashLeft from "../../components/cashbook/cashLeft/CashLeft";
import CashRight from "../../components/cashbook/cashRight/CashRight";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import CashOut from "../../components/cashbook/cashOut/CashOut";
import CashIn from "../../components/cashbook/cashIn/CashIn";
import EditOut from "../../components/cashbook/editOut/EditOut";
import EditIn from "../../components/cashbook/editIn/EditIn";
import { SnackbarProvider, useSnackbar } from "notistack";
import { UserContext } from "../../context/UserIdContext";
import NoSelected from "../../components/cashbook/noSelected/NoSelected";
const MyApp = () => {
  const { cashId, change } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState(false);

  const [state, setState] = useState({
    out: false,
    in: false,
    editOut: false,
    editIn: false,
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
      {anchor === "out" ? (
        <CashOut
          snack={() =>
            handleClickVariant("success", "out", "Transaction Has been Added")
          }
        />
      ) : anchor === "in" ? (
        <CashIn
          snack={() =>
            handleClickVariant("success", "in", "Transaction Has been Added")
          }
        />
      ) : anchor === "editOut" ? (
        <EditOut
          snack={() =>
            handleClickVariant(
              "success",
              "editOut",
              "Transaction Has been Updated"
            )
          }
        />
      ) : anchor === "editIn" ? (
        <EditIn
          snack={() =>
            handleClickVariant(
              "success",
              "editIn",
              "Transaction Has been Updated"
            )
          }
        />
      ) : (
        ""
      )}
    </Box>
  );
  const check = () => {
    cashId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    check();
  }, [cashId, change]);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["out"]}
        onClose={toggleDrawer("out", false)}
      >
        {list("out")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["in"]}
        onClose={toggleDrawer("in", false)}
      >
        {list("in")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["editOut"]}
        onClose={toggleDrawer("editOut", false)}
      >
        {list("editOut")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["editIn"]}
        onClose={toggleDrawer("editIn", false)}
      >
        {list("editIn")}
      </Drawer>
      <div className="cashbook">
        <Navbar />
        <div className="content flex">
          <CashLeft
            out={toggleDrawer("out", true)}
            in={toggleDrawer("in", true)}
          />
          {active ? (
            <CashRight
              snack={() =>
                handleClickVariant(
                  "success",
                  "",
                  "Transaction Has been Deleted"
                )
              }
              editOut={toggleDrawer("editOut", true)}
              editIn={toggleDrawer("editIn", true)}
            />
          ) : (
            <NoSelected />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Cashbook = () => {
  return (
    <SnackbarProvider maxSnack={2}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default Cashbook;
