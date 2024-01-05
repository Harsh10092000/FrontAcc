import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserIdContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import SaleLeft from "../../components/sales/saleLeft/SaleLeft";
import SaleRight from "../../components/sales/saleRight/SaleRight";
import SalesInvoice from "../../components/sales/salesInvoice/SalesInvoice";
import PaymentIn from "../../components/sales/salesPaymentIn/SalesPaymenIn";
import { IconBox, IconUsers } from "@tabler/icons-react";
import SaleEditPayIn from "../../components/sales/saleEditPayIn/saleEditPayIn";
const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    pdf: false,
    addPayment: false,
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
    toggleDrawer1(anchor1, false);
    enqueueSnackbar(msg, { variant });
  };
  const list = (anchor) => (
    <Box role="presentation">
      {anchor === "pdf" ? (
        <Box sx={{ width: 950 }}>
          <SalesInvoice />
        </Box>
      ) : anchor === "edit" ? 
      <Box sx={{ width: 450 }} >
        <SaleEditPayIn
          snack={() =>
            handleClickVariant(
              "success",
              "edit",
              "Transaction Has been Updated"
            )
          }
        /> </Box> : anchor === "addPayment" ? (
        <Box sx={{ width: 450 }}>
          <PaymentIn
            sx={{ width: 450 }}
            snack={() =>
              handleClickVariant("success", "addPayment", "Transaction Has been Added")
            }
          />
        </Box>
      ) : (
        "-"
      )}
    </Box>
  );
  const [active, setActive] = useState(false);
  const { saleId, change } = useContext(UserContext);
  const checkActive = () => {
    saleId === 0 ? setActive(false) : setActive(true);
  };
  useEffect(() => {
    checkActive();
  }, [saleId, change]);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={state["addPayment"]}
        onClose={toggleDrawer("addPayment", false)}
      >
        {list("addPayment")}
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
        open={state["pdf"]}
        onClose={toggleDrawer("pdf", false)}
      >
        {list("pdf")}
      </Drawer>

      <div className="mainpage">
        <Navbar />
        <div className="content flex">
          <SaleLeft />

          {active ? (
            <SaleRight
              pdf={toggleDrawer("pdf", true)}
              addPayment={toggleDrawer("addPayment", true)}
              edit = {toggleDrawer("edit" , true)}
            />
          ) : (
            <div className="selectCustomer h-[100vh - 87px] flex flex-col justify-center items-center w-full bg-slate-100">
              <div>
                <IconBox className=" w-36 h-36 text-slate-400" />
                <p>No Transaction Selected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Sales = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
};

export default Sales;
