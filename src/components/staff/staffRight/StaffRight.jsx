import { IconEdit, IconUser, IconTrash, IconAlertOctagonFilled   } from "@tabler/icons-react";
import Bill from "../../../assets/Bill.png";
import inventory from "../../../assets/inventory.png";
import Parties from "../../../assets/Parties.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const StaffRight = (props) => {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { change, staffId, changeStaffId, changeChange } = useContext(UserContext);
  const [staffDataById, setStaffDataById] = useState({
    staff_name: "",
    staff_number: "",
    staff_parties: "",
    staff_inventory: "",
    staff_bills: "",
  });

  console.log(staffId);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/st/fetchdataById/${staffId}`)
      .then((response) => {
        setStaffDataById({
          ...staffDataById,
          staff_name: response.data[0].staff_name,
          staff_number: response.data[0].staff_number,
          staff_parties: response.data[0].staff_parties,
          staff_inventory: response.data[0].staff_inventory,
          staff_bills: response.data[0].staff_bills,
        });
      });
  }, [staffId]);

  const delStaff = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/st/delData/${staffId}`
      );
      changeChange();
      changeStaffId(0);
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
            <div className="text-lg">{staffDataById.staff_name}</div>
            <div className="text-xs">{staffDataById.staff_number}</div>
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
                  <DialogTitle id="alert-dialog-title">
                    Are You Sure ?
                  </DialogTitle>
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
                      onClick={delStaff}
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
            <div className="text-lg">Bills</div>
            <div>
              {staffDataById.staff_bills === 0
                ? "No Access"
                : staffDataById.staff_bills === 1
                ? "View & Add for All Bills (Sales/Purchase/Returns) & Cashbook"
                : "Add, Edit & Delete for Bills, Cashbook & Reports"}
            </div>
          </div>
          <img src={Bill} alt="" className="w-24" />
        </div>
        <div className="px-4 shadow py-2 bg-yellow-100/20 rounded flex justify-between items-center">
          <div>
            <div className="text-lg">Inventory</div>
            <div>
              {staffDataById.staff_inventory === 0
                ? "No Access"
                : staffDataById.staff_inventory === 1
                ? "Add Items & Stock In/Out"
                : "Add, Edit & Delete: Items, Stock In/Out"}
            </div>
          </div>
          <img src={inventory} alt="" className="w-24" />
        </div>
        <div className="px-4 shadow py-2 bg-blue-100/20 rounded flex justify-between items-center">
          <div>
            <div className="text-lg">Parties</div>
            <div>
              {staffDataById.staff_parties === 0
                ? "No Access"
                : staffDataById.staff_parties === 1
                ? "View Entries & Send Reminders"
                : staffDataById.staff_parties === 2
                ? "Add & View: Entries/Parties"
                : "Add, View, Edit & Delete: Entries/Parties & Reports"}
            </div>
          </div>
          <img src={Parties} alt="" className="w-24" />
        </div>
      </div>
    </div>
  );
};

export default StaffRight;
