import { IconPointFilled, IconBook } from "@tabler/icons-react";
import "./transaction.scss";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Transaction = (props) => {
  const navigate = useNavigate();
  const time1 = new Date(props.transactions.tran_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";
  const { changeTranId, tranId, change, changeSaleId } =
    useContext(UserContext);
  const tid = (e) => {
    changeTranId(props.transactions.tran_id),
      props.transactions.tran_pay
        ? props.editPay(e)
        : props.transactions.tran_receive
        ? props.editReceive(e)
        : alert("No Transactions");
  };

  const changeS = () => {
    changeSaleId(props.transactions.tran_sale_cnct_id);
    navigate("/sales");
  };
  const checkNavigate = () => {
    if (props.transactions.tran_sale_cnct_id !== null) {
      changeS();
    } else {
      tid(props.transactions.tran_id);
    }
  };

  return (
    <div>
      {parseFloat(props.transactions.tran_pay) !== 0 &&
      parseFloat(props.transactions.tran_receive) !== 0 ? (
        <div className="transaction cursor-pointer" onClick={checkNavigate}>
          <div className="details flex flex-col gap-1 ">
            <div className="date font-semibold flex items-center gap-1 text-slate-800">
              {props.transactions.tran_date}
              <IconPointFilled className="w-3 h-3" />
              {fhours + ":" + fminutes + " " + AMPM}
            </div>
            <div className="text-sm text-slate-600">
              Balance : {props.totalBalance.toFixed(2)}
            </div>
          </div>
          <div className="flex gap-56 mr-36">
            <div className="text-red-600">
              {props.transactions.tran_pay
                ? "₹ " + parseFloat(props.transactions.tran_pay).toFixed(2)
                : "-"}
            </div>
            <div className="text-green-600">
              {props.transactions.tran_receive
                ? "₹ " + parseFloat(props.transactions.tran_receive).toFixed(2)
                : "-"}
            </div>
          </div>
        </div>
      ) : (
        <div className="transactions ">
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

export default Transaction;


// import { IconPointFilled, IconBook } from "@tabler/icons-react";
// import "./transaction.scss";
// import { UserContext } from "../../../context/UserIdContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// const Transaction = (props) => {
//   const navigate = useNavigate();
//   const time1 = new Date(props.transactions.tran_time);
//   const hours = time1.getHours();
//   const minutes = time1.getMinutes();
//   const fminutes = minutes < 10 ? "0" + minutes : minutes;
//   const fhours = hours > 12 ? hours - 12 : hours;
//   const AMPM = hours > 12 ? "PM" : "AM";
//   const { changeTranId, tranId, change, changeSaleId } =
//     useContext(UserContext);
  

//   return (
//     <div>
      
//         <div className="transaction cursor-pointer" >
//           <div className="details flex flex-col gap-1 ">
//             <div className="date font-semibold flex items-center gap-1 text-slate-800">
//               6 jan 2024
//               <IconPointFilled className="w-3 h-3" />
//               09:34 AM
//             </div>
//             <div className="text-sm text-slate-600">
//               Balance : {props.transactions.hsn_code}
//             </div>
//           </div>
//           <div className="flex gap-56 mr-36">
//             <div className="text-red-600">
//               {props.transactions.hsn_igst}
//             </div>
//             <div className="text-green-600">
//               {props.transactions.tran_receive
//                 ? "₹ " + parseFloat(props.transactions.tran_receive).toFixed(2)
//                 : "-"}
//             </div>
//           </div>
//         </div>
     
//     </div>
//   );
// };

// export default Transaction;

