import { IconPointFilled } from "@tabler/icons-react";
import { useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import { useNavigate } from "react-router-dom";

const SerTran = (props) => {
  const navigate = useNavigate();
  const { changeTranId, tranId, changeSaleId, changePurchaseId } =
    useContext(UserContext);
  const time1 = new Date(props.data.ser_time);
  const hours = time1.getHours();
  const minutes = time1.getMinutes();
  const fminutes = minutes < 10 ? "0" + minutes : minutes;
  const fhours = hours > 12 ? hours - 12 : hours;
  const AMPM = hours > 12 ? "PM" : "AM";

  const changeS = () => {
    changeSaleId(props.data.sale_cnct_id);
    navigate("/sales");
  };

  const checkNavigate = (e) => {
    if (props.data.sale_cnct_id !== null ) {
      changeS();
    } else {
      changeTranId(props.data.ser_tran_id);
      props.editSale(e);
    }
  };

  // const openNchange = (e) => {
  //   changeTranId(props.data.ser_tran_id);
  //   props.editSale(e);
  // };

  return (
    <div className="transaction cursor-pointer" onClick={checkNavigate}>
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
        {props.data.ser_quantity !== null ? "Sale " + props.data.ser_quantity+" "+ props.ser_unit : "Return " + props.data.ser_return+" "+ props.ser_unit}
          {/* Sale {props.data.ser_quantity} {props.ser_unit} */}
        </div>
        <div className="text-blue-600 ">
          ₹ {props.data.ser_quantity !== null ? props.data.ser_tran_price * props.data.ser_quantity : props.data.ser_tran_price * props.data.ser_return }
        </div>
      </div>
    </div>
  );
};

export default SerTran;
