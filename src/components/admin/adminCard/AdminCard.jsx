import {
  IconLockAccess,
  IconLockAccessOff,
  IconUser,
} from "@tabler/icons-react";
import axios from "axios";
import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { UserContext } from "../../../context/UserIdContext";
const AdminCard = (props) => {
  const disabledStyle =
    "cursor-not-allowed text-slate-500 disabled p-1 rounded-md shadow shadow-slate-600 w-9 h-9 flex items-center justify-center hover:bg-slate-500 hover:text-white transition-all ease-in-out duration-500";
  const { changeChange, adminAccess } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant, msg) => {
    enqueueSnackbar(msg, { variant });
  };

  const [data, setData] = useState({
    restrict: 0,
  });
  const [data1, setData1] = useState({
    unrestrict: 1,
  });
  const restrictAcc = async (businessId) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/restrictAcc/${businessId}`,
        data
      );
      handleClickVariant("success", "Updated Successfully");
      changeChange();
    } catch (err) {
      console.log(err);
    }
  };

  const unrestrictAcc = async (businessId) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND + `/api/ad/unrestrictAcc/${businessId}`,
        data1
      );
      changeChange();
      handleClickVariant("success", "Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white py-3 px-4 rounded-xl grid grid-cols-4 text-[16px] shadow-slate-300 shadow items-center">
      <div className="flex gap-4 items-center">
        <div className="h-12 w-12 bg-blue-200/40 flex justify-center items-center text-blue-600 rounded">
          <IconUser />
        </div>
        <div className="mt-1 justify-self-center">
          <p>{props.data.business_name}</p>
        </div>
      </div>
      <div className="mt-1 justify-self-center">{props.data.log_email}</div>
      <div
        className={
          props.data.access == 1
            ? "mt-1 justify-self-center text-green-500"
            : "mt-1 justify-self-center text-red-500"
        }
      >
        {props.data.access == 1 ? "Active" : "Inactive"}
      </div>
      <div className="flex gap-4 justify-self-center">
        {parseInt(props.data.access) === 1 ? (
          <button
            disabled={parseInt(adminAccess) === 2 ? false : true}
            onClick={(e) => (
              e.preventDefault(), restrictAcc(props.data.business_id)
            )}
            className={
              parseInt(adminAccess) === 2
                ? "text-red-500 p-1 rounded-md shadow shadow-red-600 w-9 h-9 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all ease-in-out duration-500"
                : disabledStyle
            }
          >
            <IconLockAccess />
          </button>
        ) : (
          <button
            disabled={parseInt(adminAccess) === 2 ? false : true}
            onClick={(e) => (
              e.preventDefault(), unrestrictAcc(props.data.business_id)
            )}
            className={
              parseInt(adminAccess) === 2
                ? "text-green-500 p-1 rounded-md shadow shadow-green-600 w-9 h-9 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all ease-in-out duration-500 "
                : disabledStyle
            }
          >
            <IconLockAccessOff />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminCard;
