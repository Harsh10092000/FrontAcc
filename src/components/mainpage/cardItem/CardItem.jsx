import React, { useContext } from "react";
import { IconUser } from "@tabler/icons-react";
import "./carditem.scss";
import { UserContext } from "../../../context/UserIdContext";


const CardItem = (props) => {

  const { changeUser, userId } = useContext(UserContext);
  const pay = props.message === null && props.result
    .filter((person) => person.cnct_id === props.users.cust_id)
    .reduce(function (prev, current) {
      return prev + +current.tran_pay;
    }, 0);
  const receive = props.message === null && props.result
    .filter((person) => person.cnct_id === props.users.cust_id)
    .reduce(function (prev, current) {
      return prev + +current.tran_receive;
    }, 0);
  const total = receive - pay;
  // const final =
  //   props.users.amt_type === "receive"
  //     ? props.users.cust_amt + total
  //     : -props.users.cust_amt + total;
  // props.skeleton
  //   ? console.log("Skeletion is true")
  //   : console.log("skeleton is false");

  return (

    <div>
 {props.message === null ? 
    
    <div
      className={
        userId === props.users?.cust_id
          ? "bg-[#e8f0fe] cardItem cursor-pointer shadow"
          : "cardItem cursor-pointer"
      }
      onClick={() => changeUser(props.users?.cust_id)}
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
              {props.users.cust_name}
            </span>
            <span className="text-slate-500 text-sm">
              {props.users.cust_number}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-end gap-1">
            <div
              className={
                total === 0 ? "text-slate-600 font-semibold text-lg" :
                total < 0
                  
                  ? "text-red-600 font-semibold text-lg"
                  : "text-green-600 font-semibold text-lg"
              }
            >
              {total === 0 ? "₹0.00" : total > 0 ? "₹ " + total.toFixed(2) : "₹ " + (total * -1).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {total === 0 ? "" : total > 0 ? "To Pay" : "To Receive"}
            </div>
          </div>
        </div>
      </div>
      
    </div>
    : props.message }
    </div>
  );
};
export default CardItem;
