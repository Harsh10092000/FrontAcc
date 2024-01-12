import {
  IconAlertCircle,
  IconBook,
  IconBrandWhatsapp,
  IconMessage2,
} from "@tabler/icons-react";
import SupCardTran from "../supCardTran/SupCardTran";
import SupTransaction from "../supTransaction/SupTransaction";
import "./supright.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const SupRight = (props) => {
  const { supId, change, parties, accountId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [supAmtType, setSupAmtType] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchTran/${supId}`)
      .then((response) => {
        setResult(response.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/sup/fetchSup/${supId}`)
      .then((response) => {
        setSupAmtType(response.data[0].sup_amt_type);
      });
  }, [supId, change]);

  return (
    <div className="supright">
      <div className="customer">
        <SupCardTran edit={props.edit} />
      </div>
      <div className="reminder flex p-3 items-center justify-between">
        <div className="left text-slate-700 flex items-center gap-3">
          Send Reminder <IconAlertCircle className="w-4 h-4" />
        </div>
        <div className="right flex gap-5">
          <button
            className="flex p-3 bg-white gap-2 items-center rounded-md text-slate-600 hover:bg-green-500 hover:text-white"
            onClick={props.snack}
          >
            <IconBrandWhatsapp className="text-green-600 onhover" />
            via Whatsapp
          </button>
          <button
            className="flex p-3 bg-white gap-2 items-center rounded-md text-slate-600  hover:bg-blue-500 hover:text-white"
            onClick={props.snack}
          >
            <IconMessage2 className="text-blue-600 onhover" />
            via SMS
          </button>
        </div>
      </div>
      <div className="heading text-slate-600">
        <div className="entry">Entries</div>
        <div className="flex gap-40 mr-24">
          <div className="gave">You'll Pay</div>
          <div className="get">You'll Receive</div>
        </div>
      </div>

      <div className="transactions">
        {result.length > 0  ? (
          result.map((item, index) => {
            if (supAmtType === "receive") {
              const sum = result
                .filter(
                  (filteredItem) => filteredItem.sup_tran_id <= item.sup_tran_id
                )
                .reduce(function (prev, current) {
                  if (current.sup_tran_pay) {
                    return prev + +current.sup_tran_pay;
                  } else {
                    return prev - +current.sup_tran_receive;
                  }
                }, 0);
              return (
                <SupTransaction
                  key={index}
                  data={item}
                  editPay={props.editPay}
                  editReceive={props.editReceive}
                  totalBalance={sum}
                />
              );
            } else {
              const sum = result
                .filter(
                  (filteredItem) => filteredItem.sup_tran_id <= item.sup_tran_id
                )
                .reduce(function (prev, current) {
                  if (current.sup_tran_pay) {
                    return prev + +current.sup_tran_pay;
                  } else {
                    return prev - +current.sup_tran_receive;
                  }
                }, 0);
              return (
                <SupTransaction
                  data={item}
                  key={index}
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
        <div className="btn shadow-lg  text-slate-600">
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

export default SupRight;
