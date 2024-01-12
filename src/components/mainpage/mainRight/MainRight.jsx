import { useContext, useDebugValue, useEffect, useState } from "react";
import CardTran from "../cardTran/CardTran";
import Transaction from "../transaction/Transaction";
import "./mainright.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { IconBook } from "@tabler/icons-react";
const MainRight = (props) => {
  const { change, userId, parties } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [custAmtType, setCustAmtType] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchTran/${userId}`)
      .then((response) => {
        setResult(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchCust/${userId}`)
      .then((response) => {
        setCustAmtType(response.data[0].amt_type);
      });
  }, [change, userId]);
  return (
    <div className="right bg-white shadow-xl w-full">
      <div className="customer">
        <CardTran edit={props.edit} />
      </div>
      <div className="heading text-slate-600">
        <div className="entry">Entries</div>
        <div className="flex gap-40 mr-32">
          <div className="gave">Paid</div>
          <div className="get">Received</div>
        </div>
      </div>

      <div className="transactions">
        {result.length > 0 ? (
          result.map((item, index) => {
            if (custAmtType === "receive") {
              const sum = result
                .filter((filteredItem) => filteredItem.tran_id <= item.tran_id)
                .reduce(function (prev, current) {
                  if (current.tran_pay) {
                    return prev + +parseFloat(current.tran_pay);
                  } else {
                    return prev - +parseFloat(current.tran_receive);
                  }
                }, 0);
              return (
                <Transaction
                  key={index}
                  transactions={item}
                  editPay={props.editPay}
                  editReceive={props.editReceive}
                  totalBalance={sum}
                />
              );
            } else {
              const sum = result
                .filter((filteredItem) => filteredItem.tran_id <= item.tran_id)
                .reduce(function (prev, current) {
                  if (current.tran_pay) {
                    return prev + +parseFloat(current.tran_pay);
                  } else {
                    return prev - +parseFloat(current.tran_receive);
                  }
                }, 0);
              return (
                <Transaction
                  key={index}
                  transactions={item}
                  editPay={props.editPay}
                  editReceive={props.editReceive}
                  totalBalance={sum}
                />
              );
            }
          })
        ) : (
          <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">
            <div>
              <IconBook className="w-32 h-32 text-slate-600" />
            </div>
            <div>No Entries Added</div>
          </div>
        )}
      </div>
      {parties === 2 || parties === 3 ? (
        <div className="btn shadow-lg">
          <button className="pay text-red-600" onClick={props.pay}>
            Pay ₹
          </button>
          <button className="receive text-green-600 " onClick={props.receive}>
            Receive ₹
          </button>
        </div>
      ) : (
        <div className="btn shadow-lg text-slate-600">
          <button
            className=" w-full cursor-not-allowed text-slate-600 bg-slate-200 p-3 rounded-[5px]"
            disabled
          >
            Pay ₹
          </button>
          <button
            className="w-full cursor-not-allowed text-slate-600 bg-slate-200 p-3 rounded-[5px]"
            disabled
          >
            Receive ₹
          </button>
        </div>
      )}
    </div>
  );
};

export default MainRight;
