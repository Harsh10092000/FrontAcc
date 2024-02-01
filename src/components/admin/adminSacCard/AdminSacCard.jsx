import { IconDevices2 } from "@tabler/icons-react";
import {
  IconEdit,
  IconTrash,
  IconAlertOctagonFilled,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { UserContext } from "../../../context/UserIdContext";
import { useSnackbar } from "notistack";

const AdminSacCard = (props) => {
  const disabledStyle =
    "cursor-not-allowed text-slate-500 disabled p-1 rounded-md shadow shadow-slate-600 w-9 h-9 flex items-center justify-center hover:bg-slate-500 hover:text-white transition-all ease-in-out duration-500";
  const { changeSacId, sacId, changeChange, adminGstAccess } =
    useContext(UserContext);

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
        import.meta.env.VITE_BACKEND + `/api/ad/delSacCode/${sacId}`
      );
      changeChange();
      handleClose();
      handleClickVariant("success", "Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => changeSacId(props.data.id)}
      className="bg-white py-3 px-4 rounded-xl grid grid-cols-4 text-[16px] shadow-slate-400 shadow items-center"
    >
      <div className="flex gap-4 items-center">
        <div className="h-10 w-10 shadow shadow-emerald-300 flex justify-center items-center text-emerald-600 rounded">
          <IconDevices2 />
        </div>
        <div className="mt-1 justify-self-center">
          <p>{props.data.sac_code}</p>
        </div>
      </div>
      <div className="mt-1 justify-self-center">
        {props.data.sac_desc.length > 39
          ? props.data.sac_desc.slice(0, 40) + "..."
          : props.data.sac_desc}
      </div>
      <div className="justify-self-center">{props.data.sac_igst}</div>
      <div className="flex gap-4 justify-self-center">
        <button
          disabled={parseInt(adminGstAccess) === 2 ? false : true}
          onClick={props.edit}
          className={
            parseInt(adminGstAccess) === 2
              ? "text-green-500 p-1 rounded-md shadow shadow-green-600 w-9 h-9 flex items-center justify-center  hover:bg-emerald-500 hover:text-white transition-all ease-in-out duration-500 "
              : disabledStyle
          }
        >
          <IconEdit />
        </button>
        <button
          disabled={parseInt(adminGstAccess) === 2 ? false : true}
          className={
            parseInt(adminGstAccess) === 2
              ? "text-red-500 p-1 rounded-md shadow shadow-red-600 w-9 h-9 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all ease-in-out duration-500"
              : disabledStyle
          }
        >
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

export default AdminSacCard;
