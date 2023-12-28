import { useContext, useEffect, useState } from "react";
import Img from "../../../assets/proIcon.png";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const SerCard = (props) => {
  const { changeService, serId, change } = useContext(UserContext);
  const [data, setData] = useState([]);

  // const pay = props.result
  //   .filter((person) => person.cnct_id === props.users.cust_id)
  //   .reduce(function (prev, current) {
  //     return prev + +current.tran_pay;
  //   }, 0);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/ser/fetchTranid/${props.data.ser_id}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [change]);
  const sum = data.reduce(function (prev, current) {
    if (current.ser_quantity) {
      return prev + +current.ser_quantity;
    } else {
      return prev - +current.ser_return;
    }
  }, 0);
  return (
    <div
      className={
        serId === props.data.ser_id
          ? "bg-[#e8f0fe] cardItem cursor-pointer shadow"
          : "cardItem cursor-pointer"
      }
      onClick={() => changeService(props.data.ser_id)}
    >
      <div
        className="flex justify-between  items-center p-3 "
        style={{ borderBottom: "1px solid rgb(245 245 245" }}
      >
        <div className="flex items-center gap-4 w-[200px]">
          <div className="icon">
            <img src={Img} className="w-7" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg text-slate-700">
              {props.data.ser_name}
            </span>
          </div>
        </div>
        <div className="w-[150px]">
          <div className="text-slate-800 text-lg">₹ {props.data.ser_price}</div>
        </div>
        <div className="w-[70px]">
          <div className="qty text-slate-800 text-lg">{sum}</div>
          {/* <div className="qty text-slate-800 text-lg">{props.data.ser_sales === null ? 0 : props.data.ser_sales}</div> */}
        </div>
      </div>
    </div>
  );
};

export default SerCard;
