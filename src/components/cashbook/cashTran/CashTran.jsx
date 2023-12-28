import { IconCoins, IconNotes } from "@tabler/icons-react";
import "./cashtran.scss";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import { useNavigate } from "react-router-dom";
const CashTran = (props) => {
  const { changeCashId, cashId, changeExpId, changeSaleId, changePurchaseId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const time1 = new Date(props.data.cash_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const changeE = () => {
    changeExpId(parseInt(props.data.cash_mode));
    navigate("/expenses");
  };
  const changeP = () => {
    changePurchaseId(parseInt(props.data.cash_pur_cnct_id));
    navigate("/purchase");
  };
  const changeS = () => {
    changeSaleId(props.data.cash_sale_cnct_id);
    navigate("/sales");
  };

  const checkNavigate = () => {
    console.log(props.data.cash_sale_cnct_id);
    if (props.data.cash_sale_cnct_id !== null) {
      changeS();
    } else if (props.data.cash_pur_cnct_id !== null) {
      changeP();
    } else if (
      props.data.cash_mode === "cash" ||
      props.data.cash_mode === "online"
    ) {
      changeCashId(props.data.cash_id);
    } else {
      changeE();
    }
  };

  return (
    <div
      className={
        props.data.cash_id === cashId
          ? "grid grid-cols-4 cursor-pointer p-4 border-b border-slate-100 cashtran bg-lime-200/25"
          : "grid grid-cols-4 cursor-pointer p-4 border-b border-slate-100 cashtran"
      }
      onClick={checkNavigate}
    >
      <div className="flex col-span-2 gap-3">
        <div className="notes rounded-full bg-lime-200 p-3">
          <IconCoins className="text-lime-600" />
        </div>
        <div className="details flex flex-col gap-1 ">
          <div className="date font-semibold flex items-center gap-2 text-slate-600">
            {fhours + ":" + fminutes + " " + AMPM}
            <div className="cashonline p-[2px] text-[10px] text-blue-600 bg-blue-100 rounded font-semibold uppercase">
              {props.data.cash_mode === "cash" ||
              props.data.cash_mode === "online"
                ? props.data.cash_mode
                : "Expenses"}
            </div>
          </div>
          <div className="text-sm text-slate-500 font-semibold">
            {props.data.cash_description
              ? "Description : " + props.data.cash_description
              : ""}
          </div>
        </div>
      </div>
      <div className="text-red-600 justify-self-center ml-10">
        {props.data.cash_pay ? "₹ " + props.data.cash_pay : "-"}
      </div>
      <div className="text-green-600 justify-self-end">
        {props.data.cash_receive ? "₹ " + props.data.cash_receive : "-"}
      </div>
    </div>
  );
};

export default CashTran;
