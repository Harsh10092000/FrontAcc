import { useContext } from "react";
import "./suptransaction.scss";
import { IconPointFilled, IconBook } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useNavigate } from "react-router-dom";

const SupTransaction = (props) => {
  const navigate = useNavigate();
  const { changeTranId, tranId, changePurchaseId } = useContext(UserContext);
  const time1 = new Date(props.data.sup_tran_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";
  const tid = (e) => {
    changeTranId(props.data.sup_tran_id);
    props.data.sup_tran_pay
      ? props.editPay(e)
      : props.data.sup_tran_receive
      ? props.editReceive(e)
      : alert("No Transactions");
  };

  const changeP = () => {
    changePurchaseId(props.data.sup_tran_pur_cnct_id);
    navigate("/purchase");
  };
  const checkNavigate = () => {
    if (props.data.sup_tran_pur_cnct_id !== null) {
      changeP();
    } else {
      tid(props.data.sup_tran_id);
    }
  };

  return (
    <div>
      {parseFloat(props.data.sup_tran_pay) !== 0 &&
      parseFloat(props.data.sup_tran_receive) !== 0 ? (
        <div className="transaction cursor-pointer" onClick={checkNavigate}>
          <div className="details flex flex-col gap-1 ">
            <div className="date font-semibold flex items-center gap-1 text-slate-800">
              {props.data.sup_tran_date}
              <IconPointFilled className="w-3 h-3" />
              {fhours + ":" + fminutes + " " + AMPM}
            </div>
            <div className="text-sm text-slate-600">
              Balance : {props.totalBalance.toFixed(2)}
            </div>
          </div>
          <div className="flex gap-56 mr-36">
            <div className="text-red-600">
              {props.data.sup_tran_pay !== null
                ? "₹ " + parseFloat(props.data.sup_tran_pay).toFixed(2)
                : "-"}
            </div>
            <div className="text-green-600">
              {props.data.sup_tran_receive !== null
                ? "₹ " + parseFloat(props.data.sup_tran_receive).toFixed(2)
                : "-"}
            </div>
          </div>
        </div>
      ) : (
        <div className="transactions">
          <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">
            <div>
              <IconBook className="w-32 h-32 text-slate-600" />
            </div>
            <div>No Entries Added</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupTransaction;
