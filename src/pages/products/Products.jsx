import React from "react";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ProLeft from "../../components/products/proLeft/ProLeft";
import ProRight from "../../components/products/proRight/ProRight";
import SelectProduct from "../../components/products/selectProduct/SelectProduct";
import { UserContext } from "../../context/UserIdContext";
import { Box, Drawer } from "@mui/material";
import AddProduct from "../../components/products/addProduct/AddProduct";
import StockOut from "../../components/products/stockOut/StockOut";
import StockIn from "../../components/products/stockIn/StockIn";
import EditProduct from "../../components/products/editProduct/EditProduct";
import { SnackbarProvider,useSnackbar } from "notistack";

const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    add: false,
    edit: false,
    out: false,
    in: false,
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
  const toggleDrawer1=(anchor,open)=>{
    setState({ ...state, [anchor]: open });
  }
  const handleClickVariant =(variant,anchor1,msg)=> {
    // variant could be success, error, warning, info, or default
    toggleDrawer1(anchor1,false);
    enqueueSnackbar(msg, { variant });
  };
  const list = (anchor) => (
    <Box sx={{ width: 400 }} role="presentation">
      {anchor === "add"
        ? <AddProduct snack={()=>handleClickVariant('success',"add","Product Has been Added")}/>
        : anchor === "edit"
        ? <EditProduct snack={()=>handleClickVariant('success',"edit","Product Updated Successfully")} snackd={()=>handleClickVariant('success',"edit","Deleted Successfully")}/>
        : anchor === "out"
        ? <StockOut snack={()=>handleClickVariant('success',"out","Sale has been recorded")}/>
        : anchor === "in"
        ? <StockIn snack={()=>handleClickVariant('success',"in","Purchase has been recorded")}/>
        : "-"}
    </Box>
  );
  const { pId } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const update = () => {
    pId > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    update();
  }, [pId]);
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

      <div className="items">
        <Navbar />
        <div className="content flex">
          <ProLeft add={toggleDrawer("add", true)}/>
          {active ? <ProRight edit={toggleDrawer("edit",true)} out={toggleDrawer("out",true)} in={toggleDrawer("in",true)}/> : <SelectProduct />}
        </div>
      </div>
    </React.Fragment>
  );
};


const Products=()=>{
  return (
    <SnackbarProvider maxSnack={1}>
    <MyApp />
  </SnackbarProvider>
  )
}

export default Products;
