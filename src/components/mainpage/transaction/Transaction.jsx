import { IconPointFilled } from "@tabler/icons-react";
import "./transaction.scss";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";
const Transaction = (props) => {
  const time1 = new Date(props.transactions.tran_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";
  const { changeTranId, tranId, change } = useContext(UserContext);
  const tid = (e) => {
    changeTranId(props.transactions.tran_id),
      props.transactions.tran_pay
        ? props.editPay(e)
        : props.transactions.tran_receive
        ? props.editReceive(e)
        : alert("No Transactions");
  };

  return (
    <div className="transaction cursor-pointer" onClick={(e) => tid(e)}>
      <div className="details flex flex-col gap-1 ">
        <div className="date font-semibold flex items-center gap-1 text-slate-800">
          {props.transactions.tran_date}
          <IconPointFilled className="w-3 h-3" />
          {fhours + ":" + fminutes + " " + AMPM}
        </div>
        <div className="text-sm text-slate-600">Balance : {props.transactions.balance}</div>
      </div>
      <div className="flex gap-56 mr-36">
        <div className="text-red-600">
          {props.transactions.tran_pay
            ? "₹ " + props.transactions.tran_pay
            : "-"}
        </div>
        <div className="text-green-600">
          {props.transactions.tran_receive
            ? "₹ " + props.transactions.tran_receive
            : "-"}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
