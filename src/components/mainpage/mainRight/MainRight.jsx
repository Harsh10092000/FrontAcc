import { useContext, useDebugValue, useEffect, useState } from "react";
import CardTran from "../cardTran/CardTran";
import Transaction from "../transaction/Transaction";
import "./mainright.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { IconBook } from "@tabler/icons-react";
const MainRight = (props) => {
  const { change, userId } = useContext(UserContext);
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/fetchTran/${userId}`)
      .then((response) => {
        setResult(response.data);
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
          result.map((item, index) => (
            <Transaction
              key={index}
              transactions={item}
              editPay={props.editPay}
              editReceive={props.editReceive}
            />
          ))
        ) : (
          <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">
            <div>
              <IconBook className="w-32 h-32 text-slate-600" />
            </div>
            <div>No Entries Added</div>
          </div>
        )}
      </div>
      <div className="btn shadow-lg">
        <button className="pay text-red-600" onClick={props.pay}>
          Pay ₹
        </button>
        <button className="receive text-green-600 " onClick={props.receive}>
          Receive ₹
        </button>
      </div>
    </div>
  );
};

export default MainRight;
