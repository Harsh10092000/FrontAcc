import { IconEdit, IconTrash, IconUser } from "@tabler/icons-react";
import Bill from "../../../../assets/Bill.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserIdContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
} from "@mui/material";
import axios from "axios";
import EditModerator from "../../drawerModerator/editDrawer";
import { motion } from "framer-motion";

const ModeratorRight = () => {
  const { modId, setModId, changeChange } = useContext(UserContext);
  const [modData, setModData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/ad/deleteModerator/" + modId) // api calling for deletion
      .then((res) => {
        console.log("Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    setModId(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ad/fetchModeratorById/" + modId) // api calling for fetching data by id
      .then((response) => {
        setModData(response.data);
      });
  }, [modId, modData[0]]);

  const closeDrawer = () => {
    setOpen(false);
  };

  const setXY = () => {
    var tmpX = Math.random() * 300;
    var tmpY = Math.random() * 150;
    setX(-tmpX);
    setY(-tmpY);
  };

  return (
    <>
      <Drawer // edit right drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <EditModerator data={modData[0]} draw={closeDrawer} />
      </Drawer>

      {/* dialog */}

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
      >
        <div className="p-3">
          <DialogTitle id="dialog-title">
            Are u sure ?... u wanna delete it man !
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-desc">
              Dekh le bhai ,vaps nhi aayega yeah phir
            </DialogContentText>
          </DialogContent>
          <DialogActions className="flex gap-2">
            <motion.button
              onHoverStart={() => {
                setXY();
              }}
              animate={{ x, y }}
              className="py-1 px-3 shadow shadow-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"
            >
              Yes
            </motion.button>
            <button
              onClick={() => {
                setOpenDialog(false);
              }}
              className="py-1 px-3 shadow shadow-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"
            >
              No
            </button>
          </DialogActions>
        </div>
      </Dialog>

      <div className="flex flex-col w-full h-[100vh] px-2 py-1 ">
        <div className="flex bg-white p-4 justify-between rounded-md border-b">
          <div className="flex gap-3">
            <div className="rounded-full w-10 h-10 p-2 bg-purple-300/50 text-purple-500">
              <IconUser />
            </div>
            <div className="text-lg pt-1.5">
              {modData.length > 0 ? modData[0].mod_name : ""}
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className="flex gap-2 p-2 h-9 items-center text-blue-600 hover:text-white hover:bg-blue-600 border-blue-500 border rounded shadow shadow-blue-400"
              onClick={() => {
                setOpen(true);
              }}
            >
              <IconEdit className="w-6 h-6 " />
              <div className="font-semibold">Edit Details</div>
            </div>
            <div
              className="flex gap-2 p-2 h-9 items-center text-red-600 hover:text-white hover:bg-red-600 border-red-500 border rounded shadow shadow-red-400 "
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <IconTrash className="w-6 h-6" />{" "}
              <div className="font-semibold">Delete</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <div className="border px-2 py-1 flex gap-[250px] rounded-xl shadow shadow-slate-400 hover:bg-slate-300/50 ">
            <div className="p-4 w-full">
              <div className="text-lg">Bills</div>
              <div className="text-md text-slate-600"></div>
            </div>
            <div>
              <img src={Bill} className="h-28 w-64" />
            </div>
          </div>
          <div className="border px-2 py-1 flex gap-[250px] rounded-xl shadow shadow-slate-400 hover:bg-slate-300/50 ">
            <div className="p-4 w-full">
              <div className="text-lg">Bills</div>
              <div className="text-md text-slate-600">No Access</div>
            </div>
            <div>
              <img src={Bill} className="h-28 w-64" />
            </div>
          </div>
          <div className="border px-2 py-1 flex gap-[250px] rounded-xl shadow shadow-slate-400 hover:bg-slate-300/50">
            <div className="p-4 w-full">
              <div className="text-lg">Bills</div>
              <div className="text-md text-slate-600">No Access</div>
            </div>
            <div>
              <img src={Bill} className="h-28 w-64" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorRight;
