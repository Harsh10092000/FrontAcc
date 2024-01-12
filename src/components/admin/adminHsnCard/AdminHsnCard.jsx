import {
  IconBoxSeam,
  IconEdit,
  IconTrash,
  IconAlertOctagonFilled
} from "@tabler/icons-react";
import React from "react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSnackbar } from "notistack";

const AdminHsnCard = (props) => {
  const { changeHsnId, hsnId, changeChange, adminAccess } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/ad/delHsnCode/${hsnId}`
      );
      changeChange();
      handleClose();
      handleClickVariant("success" , "Deleted Successfully")
    } catch (err) {
      console.log(err);
    }
  };

  const disabledStyle = "cursor-not-allowed text-slate-500 disabled p-1 rounded-md shadow shadow-slate-600 w-9 h-9 flex items-center justify-center hover:bg-slate-500 hover:text-white transition-all ease-in-out duration-500"

  return (
    <div onClick={() => changeHsnId(props.data.id)} className="bg-white py-3 px-4 rounded-xl grid grid-cols-4 text-[16px] shadow-slate-400 shadow items-center">
      <div className="flex gap-4 items-center">
        <div className="h-10 w-10 shadow shadow-emerald-600 flex justify-center items-center text-emerald-600 rounded">
          <IconBoxSeam />
        </div>
        <div className="mt-1 justify-self-center">
          <p>{props.data.hsn_code}</p>
        </div>
      </div>
      <div className="mt-1 justify-self-center">{props.data.hsn_desc.length > 39 ? props.data.hsn_desc.slice(0,40) + '...' : props.data.hsn_desc }</div>
      <div className="mt-1 justify-self-center">{props.data.igst}</div>
      <div className="flex gap-4 justify-self-center">
        <button disabled={parseInt(adminAccess) === 2 ? false : true} onClick={props.edit} className={ parseInt(adminAccess) === 2 ?"text-emerald-500 p-1 rounded-md shadow shadow-emerald-600 w-9 h-9 flex items-center justify-center  hover:bg-emerald-500 hover:text-white transition-all ease-in-out duration-500 "  : disabledStyle }>
          <IconEdit />
        </button>
        <button disabled={parseInt(adminAccess) === 2 ? false : true} className={ parseInt(adminAccess) === 2 ? "text-rose-500 p-1 rounded-md shadow shadow-rose-600 w-9 h-9 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all ease-in-out duration-500"  : disabledStyle }>
          <IconTrash onClick={handleClickOpen} />
        </button>
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
                disabled={parseInt(adminAccess) === 2 ? false : true}
                  className="delete-btn text-red-600 pb-3 pr-3"
                  autoFocus
                  onClick={handleDelete}
                >
                  Delete Entry
                </button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminHsnCard;
