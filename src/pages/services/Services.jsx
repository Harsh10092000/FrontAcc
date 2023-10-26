import React from "react";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SerLeft from "../../components/services/serLeft/SerLeft";
import SerRight from "../../components/services/serRight/SerRight";
import SelectService from "../../components/services/selectService/SelectService";
import { UserContext } from "../../context/UserIdContext";
import { Box, Drawer } from "@mui/material";
import AddService from "../../components/services/addService/AddService";
import RecordSale from "../../components/services/recordSale/RecordSale";
import EditSale from "../../components/services/editSale/EditSale";
import EditService from "../../components/services/editService/EditService";
import { SnackbarProvider,useSnackbar } from "notistack";



const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    add: false,
    edit: false,
    record: false,
    editSale:false,
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
      {anchor === "add" ? (
        <AddService snack={()=>handleClickVariant('success',"add","Service Has been Added")}/>
      ) : anchor === "edit" ? (
        <EditService snackd={()=>handleClickVariant('success',"edit","Deleted Successfully")} snacku={()=>handleClickVariant('success',"edit","Updated Successfully")}/>
      ) : anchor === "record" ? (
        <RecordSale snack={()=>handleClickVariant('success',"record","Sale Has been Recorded")}/>
      ) : anchor === "editSale" ? (
        <EditSale snackd={()=>handleClickVariant('success',"editSale","Deleted Successfully")} snacku={()=>handleClickVariant('success',"editSale","Updated Successfully")}/>
      ) : (
        "-"
      )}
    </Box>
  );
  const { serId } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const update = () => {
    serId > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    update();
  }, [serId]);

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
        open={state["record"]}
        onClose={toggleDrawer("record", false)}
      >
        {list("record")}
      </Drawer>
      <Drawer
        anchor="right"
        open={state["editSale"]}
        onClose={toggleDrawer("editSale", false)}
      >
        {list("editSale")}
      </Drawer>
      <div className="services">
        <Navbar />
        <div className="content flex">
          <SerLeft add={toggleDrawer("add", true)} />
          {active ? (
            <SerRight
              edit={toggleDrawer("edit", true)}
              record={toggleDrawer("record", true)}
              editSale={toggleDrawer("editSale",true)}
            />
          ) : (
            <SelectService />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const Services =()=>{
  return(
    <SnackbarProvider maxSnack={1}>
      <MyApp/>
    </SnackbarProvider>
  )
}

export default Services;
