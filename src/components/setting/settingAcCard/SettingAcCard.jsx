import {
  IconEdit,
  IconTrash,
  IconUser,
  IconAlertOctagonFilled,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";

const SettingAcCard = (props) => {
  const { accountId, changeChange, changeAccountId, userType } =
    useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };
  const [dialog, setDialog] = useState(false);
  const handleDialog = () => {
    setDialog(true);
  };
  const closeDialog = () => {
    setDialog(false);
  };

  const [imgOpen, setImgOpen] = useState(false);
  const handleImgOpen = () => {
    setImgOpen(true);
  };

  const handleImgClose = () => {
    setImgOpen(false);
  };

  const access_validation = parseInt(props.data.access) !== 0;
  const user_validation = parseInt(userType) !== 0;

  const deleteAc = async () => {
    await axios.delete(
      import.meta.env.VITE_BACKEND + `/api/act/delData/${parseInt(accountId)}`
    );
    handleClickVariant("success", "Deleted Successfully");
    changeChange();
    //changeAccountId(0);
    closeDialog();
  };

  return (
    <div
      className={
        accountId === props.data.business_id
          ? "p-4 flex bg-white rounded-lg justify-between items-center shadow shadow-blue-600"
          : "p-4 flex bg-white rounded-lg justify-between items-center hover:shadow"
      }
    >
      <div className="flex items-center gap-4">
        <img
          src={
            import.meta.env.VITE_BACKEND +
            "/account/" +
            props.data.business_logo
          }
          width={50}
          height={50}
          onClick={handleImgOpen}
          alt=""
          className="w-10 rounded h-10 object-cover"
        />
        <Dialog
          open={imgOpen}
          onClose={handleImgClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >
          <div>
            <DialogContent>
              <img
                className="image"
                src={
                  import.meta.env.VITE_BACKEND +
                  "/account/" +
                  props.data.business_logo
                }
                alt="no image"
              />
            </DialogContent>
          </div>
        </Dialog>
        <div>
          <div className="font-semibold">Business Name</div>
          <div className="text-xl">{props.data.business_name}.</div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className=" text-center">
          <div className="font-semibold">GSTIN</div>
          <div className="text-sm uppercase">
            &nbsp;{props.data.business_gst}
          </div>
        </div>
        <div className=" text-center">
          <div className="font-semibold">Business Type</div>
          <div className="text-sm capitalize">
            &nbsp;{props.data.business_type.replaceAll("_", " ")}
          </div>
        </div>
        <div className=" text-center">
          <div className="font-semibold">Business Nature</div>
          <div className="text-sm capitalize">
            &nbsp;{props.data.business_nature.replace("_", " ")}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="shadow-sm shadow-emerald-600 p-2 rounded text-emerald-600 cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-500">
          <IconUser />
        </div>

        <Link to={user_validation ? "/editAccount" : ""}>
          <div
            className={
              user_validation
                ? "shadow-sm shadow-sky-600 p-2 rounded text-sky-600 cursor-pointer hover:bg-sky-600 hover:text-white transition-all duration-500"
                : "shadow-sm shadow-slate-600 p-2 rounded text-slate-600 transition-all duration-500 cursor-not-allowed"
            }
          >
            <IconEdit />
          </div>
        </Link>

        <div
          onClick={user_validation ? handleDialog : ""}
          className={
            user_validation
              ? "shadow-sm shadow-rose-600 p-2 rounded text-rose-600 cursor-pointer hover:bg-rose-600 hover:text-white transition-all duration-500"
              : "shadow-sm shadow-slate-600 p-2 rounded text-slate-600 transition-all duration-500 cursor-not-allowed"
          }
        >
          <IconTrash />
        </div>
        <Dialog
          open={dialog}
          onClose={closeDialog}
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
                  You are about to delete the Account ! This action cannot be
                  undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions className="flex gap-4">
                <button className="pb-3" onClick={closeDialog}>
                  Cancel
                </button>
                <button
                  className="delete-btn text-red-600 pb-3 pr-3"
                  onClick={deleteAc}
                >
                  Delete Account
                </button>
              </DialogActions>
            </div>
          </div>
        </Dialog>

        <div
          className={
            access_validation
              ? "shadow-sm shadow-blue-600 p-2 rounded text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-500"
              : "shadow-sm shadow-slate-600 p-2 rounded text-slate-600 transition-all duration-500 cursor-not-allowed"
          }
          onClick={access_validation ? props.change : 0}
        >
          Use Account
        </div>
      </div>
    </div>
  );
};

export default SettingAcCard;
