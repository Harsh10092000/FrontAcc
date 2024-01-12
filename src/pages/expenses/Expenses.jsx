import React from "react";
import "./expenses.scss";
import Navbar from "../../components/navbar/Navbar";
import ExLeft from "../../components/expenses/exLeft/ExLeft";
import ExRight from "../../components/expenses/exRight/ExRight";
import { useState, useEffect, useContext } from "react";
import { Box, Drawer } from "@mui/material";
import AddExpense from "../../components/expenses/exAdd/ExAdd";
import { SnackbarProvider, useSnackbar } from "notistack";
import { UserContext } from "../../context/UserIdContext";
import EditExpenses from "../../components/expenses/editExpenses/EditExpenses";
import NoExpenseSelected from "../../components/expenses/noExpenseSelected/NoExpenseSelected";

const MyApp = () => {
  const { expId, change } = useContext(UserContext);
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
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, anchor1, msg) => {
    // variant could be success, error, warning, info, or default
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };

  const list = (anchor) => (
    <Box sx={{ width: 450 }} role="presentation">
      {anchor === "add" ? (
        <AddExpense
          snack={() =>
            handleClickVariant("success", "add", "Transaction Has been Added")
          }
        />
      ) : anchor === "edit" ? (
        <EditExpenses
          snack={() =>
            handleClickVariant(
              "success",
              "edit",
              "Transaction Has been Updated"
            )
          }
        />
      ) : (
        ""
      )}
    </Box>
  );
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
      <div className="expenses">
        <Navbar />
        <div className="content flex">
          <ExLeft add={toggleDrawer("add", true)} />

          {expId > 0 ? (
            <ExRight
              snack={() =>
                handleClickVariant(
                  "success",
                  "",
                  "Transaction Has been Deleted"
                )
              }
              edit={toggleDrawer("edit", true)}
            />
          ) : (
            <NoExpenseSelected />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Expenses = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default Expenses;
