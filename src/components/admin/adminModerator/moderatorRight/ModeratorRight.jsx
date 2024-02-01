import {
  IconEdit,
  IconUser,
  IconTrash,
  IconAlertOctagonFilled,
} from "@tabler/icons-react";
import Bill from "../../../../assets/Bill.png";
import inventory from "../../../../assets/inventory.png";
import Parties from "../../../../assets/Parties.png";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserIdContext";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ModeratorRight = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { change, moderatorId, changeModeratorId, changeChange } =
    useContext(UserContext);
  const [moderatorDataById, setModeratorDataById] = useState({
    mod_name: "",
    mod_email: "",
    mod_accounts: "",
    mod_gst: "",
    mod_payplan: "",
  });

  
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/ad/fetchModeratorById/${moderatorId}`
      )
      .then((response) => {
        setModeratorDataById({
          ...moderatorDataById,
          mod_name: response.data[0].mod_name,
          mod_email: response.data[0].mod_email,
          mod_accounts: response.data[0].mod_accounts,
          mod_gst: response.data[0].mod_gst,
          mod_payplan: response.data[0].mod_payplan,
        });
      });
  }, [moderatorId]);

  const delModerator = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/ad/delModerator/${moderatorId}`
      );
      changeChange();
      changeModeratorId(0);
      props.snack();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="p-3 flex items-center justify-between border-b border-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-violet-300/20 flex justify-center items-center rounded-full text-violet-600">
            <IconUser />
          </div>
          <div>
            <div className="text-lg">{moderatorDataById.mod_name}</div>
            <div className="text-xs">{moderatorDataById.mod_email}</div>
          </div>
        </div>
        <div className="editndel flex justify-end gap-4 self-center w-[25vw]">
          <button
            onClick={props.edit}
            className="flex gap-1 border-solid border p-2 rounded border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 transition duration-300"
          >
            <IconEdit />
            Edit Details
          </button>
          <button
            className="flex items-center gap-2 del p-2 rounded text-red-600 hover:text-white hover:bg-red-600"
            style={{
              border: "1px solid #dc2626",
              transition: "all 300ms ease-in-out",
            }}
            onClick={handleClickOpen}
          >
            <IconTrash className="w-5 h-5" /> Delete
          </button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="flex">
            <div className="pt-5 pl-3">
              <IconAlertOctagonFilled size={60} className="text-red-600" />
            </div>
            <div>
              <DialogTitle id="alert-dialog-title">Are You Sure ?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You are about to delete this Entry This action cannot be
                  undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions className="flex gap-4">
                <button className="pb-3" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="delete-btn text-red-600 pb-3 pr-3"
                  onClick={delModerator}
                  autoFocus
                >
                  Delete Entry
                </button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="px-4 py-6 text-black flex flex-col gap-4">
        <div className="px-4 shadow py-2 bg-green-100/20 rounded flex justify-between items-center">
          <div>
            <div className="text-lg">Accounts</div>
            <div>
              {moderatorDataById.mod_accounts === 0
                ? "No Access"
                : moderatorDataById.mod_accounts === 1
                ? "View all Accounts"
                : "Resrict & Unrestrict Accounts"}
            </div>
          </div>
          <img src={Parties} alt="" className="w-24" />
        </div>
        <div className="px-4 shadow py-2 bg-yellow-100/20 rounded flex justify-between items-center">
          <div>
            <div className="text-lg">Gst Codes</div>
            <div>
              {moderatorDataById.mod_gst === 0
                ? "No Access"
                : moderatorDataById.mod_gst === 1
                ? "View & Add Gst Code"
                : "Add, Edit & Delete: Gst Code"}
            </div>
          </div>
          <img src={Bill} alt="" className="w-24" />
        </div>
        <div className="px-4 shadow py-2 bg-blue-100/20 rounded flex justify-between items-center">
          <div>
            <div className="text-lg">Payment Plan</div>
            <div>
              
              {moderatorDataById.mod_payplan === 0
                ? "No Access"
                : moderatorDataById.mod_payplan === 1
                ? "View Payment Plans"
                : "Add, View, Edit & Delete: Payment Plan"}
            </div>
          </div>
          <img src={inventory} alt="" className="w-24" />
        </div>
      </div>
    </div>
  );
};

export default ModeratorRight;
