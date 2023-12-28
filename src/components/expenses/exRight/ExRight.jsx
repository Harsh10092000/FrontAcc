import { IconEdit, IconTrash } from "@tabler/icons-react";
import "./exright.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExpensesRightTran from "../exRightTran/exRightTran";

const ExRight = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { change, expId, changeChange, changeExpId } = useContext(UserContext);
  const [result2, setResult2] = useState([]);

  const [data, setData] = useState({
    exp_category: "",
    exp_date: "",
    exp_time: "",
  });
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/exp/fetchExpensesTran/${expId}`)
      .then((response) => {
        setData({
          ...data,
          exp_category: response.data[0].exp_category,
          exp_date: response.data[0].exp_date,
          exp_time: response.data[0].exp_time,
        });
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/exp/fetchExpensesRightTran/${expId}`
      )
      .then((response) => {
        setResult2(response.data);
      });
  }, [change, expId]);

  const deleteExpenses = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/exp/delexpenses/${expId}`
      );
      changeChange();
      changeExpId(0);
      props.snack();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const time1 = new Date(data.exp_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const total_amt = result2
    .map((item) => item.exp_item_price * item.exp_item_qty)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  console.log(result2);
  return (
    <div className="exright">
      <div className="exCard">
        <div className="grid grid-cols-3 p-4 border-b border-slate-100 cnt">
          <div className="flex col-span-2 gap-4">
            <div className="details flex flex-col gap-2 ">
              <div className="date font-semibold flex items-center gap-2 text-slate-900 text-xl">
                {data.exp_category}
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {fhours + ":" + fminutes + " " + AMPM} , {data.exp_date}
              </div>
            </div>
          </div>
          <div className="editndel flex justify-center gap-5 self-center">
            <button
              className="edit flex items-center gap-2 p-2 rounded text-blue-700 hover:text-white hover:bg-blue-700"
              onClick={props.edit}
            >
              <IconEdit className="w-5 h-5" /> Edit
            </button>
            <button
              className="flex items-center gap-2 del p-2 rounded text-red-600 hover:text-white hover:bg-red-600"
              onClick={handleClickOpen}
            >
              <IconTrash className="w-5 h-5" /> Delete
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
                      onClick={deleteExpenses}
                      autoFocus
                    >
                      Delete Entry
                    </button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-2 m-5 bg-slate-100 text-lg font-semibold text-slate-800">
        <div>Items</div>
      </div>
      <div className="information">
        {result2.map((item, index) => (
          <div key={index}>
            <ExpensesRightTran data={item} total_amt={total_amt} />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-7 py-5 border-t border-slate-300 text-lg border-l">
        <div className="font-semibold">Net Amount</div>
        <div className="text-slate-800 justify-self-end font-semibold">
          ₹ {total_amt}
        </div>
      </div>
    </div>
  );
};

export default ExRight;
