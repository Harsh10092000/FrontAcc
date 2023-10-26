import { IconPointFilled } from "@tabler/icons-react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";

const SerTran = (props) => {
  const { changeTranId, tranId } = useContext(UserContext);
  const time1 = new Date(props.data.ser_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";
  const openNchange = (e) => {
    changeTranId(props.data.ser_tran_id);
    props.editSale(e);
  };
  console.log(tranId);
  return (
    <div className="transaction cursor-pointer" onClick={openNchange}>
      <div className="details flex flex-col gap-1 ">
        <div className="date font-semibold flex items-center gap-1 text-slate-800">
          {props.data.ser_date}
          <IconPointFilled className="w-3 h-3" />
          {fhours + ":" + fminutes + " " + AMPM}
        </div>
        {/* <div className="text-sm text-slate-600">Balance : -500</div> */}
      </div>
      <div className=" mr-60">
       <div>
        Sale {props.data.ser_quantity} {props.ser_unit}
       </div>
       <div className="text-blue-600 ">
       ₹ {props.data.ser_tran_price * props.data.ser_quantity}
       </div>
       
      </div>
    </div>
  );
};

export default SerTran;
