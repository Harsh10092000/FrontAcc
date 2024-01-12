import { IconUser } from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";
import "./supcard.scss";
import { UserContext } from "../../../context/UserIdContext";

const SupCard = (props) => {
  const { changeSup, supId } = useContext(UserContext);
  const pay = props.tran
    .filter((person) => person.sup_tran_cnct_id === props.data.sup_id)
    .reduce(function (prev, current) {
      return prev + +current.sup_tran_pay;
    }, 0);
  const receive = props.tran
    .filter((person) => person.sup_tran_cnct_id === props.data.sup_id)
    .reduce(function (prev, current) {
      return prev + +current.sup_tran_receive;
    }, 0);
  const total = receive - pay;
  // const final =
  //   props.data.sup_amt_type === "receive"
  //     ? props.data.sup_amt + total
  //     : -props.data.sup_amt + total;

  return (
    <div
      className={
        supId === props.data.sup_id
          ? "bg-[#e8f0fe] cardItem cursor-pointer shadow"
          : "cardItem cursor-pointer"
      }
      onClick={() => changeSup(props.data.sup_id)}
    >
      <div
        className="flex justify-between  items-center p-3 "
        style={{ borderBottom: "1px solid rgb(245 245 245" }}
      >
        <div className="flex items-center gap-2">
          <div className="icon">
            <IconUser className=" text-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg text-slate-700">
              {props.data.sup_name}
            </span>
            <span className="text-slate-500 text-sm">
              {props.data.sup_number}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-end gap-1">
            <div
              className={
                total === 0 ? "text-slate-600 font-semibold text-lg" :
                total < 0
                  ? "text-green-600 font-semibold text-lg"
                  : "text-red-600 font-semibold text-lg"
              }
            >
              {total === 0 ? "₹0.00" : total > 0 ? "₹ " + total.toFixed(2) : "₹ " + (total * -1).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {total === 0 ? "" : total > 0 ? "You'll Pay" : "You'll Receive"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupCard;
