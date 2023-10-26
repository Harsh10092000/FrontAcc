import { useContext, useEffect, useState } from "react";
import SerCardTran from "../serCardTran/SerCardTran";
import SerTran from "../serTran/SerTran";
import "./serright.scss";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
const SerRight = (props) => {
  const { serId, change } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const [serUnit , setSerUnit] = useState("")
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/ser/fetchDataid/${serId}`)
      .then((res) => {
        setResult(res.data);
        setSerUnit(res.data[0].ser_unit)
      });
    axios
      .get(`http://localhost:8000/api/ser/fetchTranid/${serId}`)
      .then((res) => {
        setData(res.data);
      });
  }, [change, serId]);
  
  return (
    <div className="serright">
      <div className="service">
        <SerCardTran data={result} edit={props.edit} />
      </div>
      {result.map((item, index) => (
        <div className="details grid grid-cols-4" key={index}>
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                ₹{item.ser_price}
              </div>
              <div className="text-xs text-slate-600">Sale Price</div>
            </div>
          </div>
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                {item.ser_unit}
              </div>
              <div className="text-xs text-slate-600">Units</div>
            </div>
          </div>
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                {item.ser_sac !== "" ? item.ser_sac : '-'}
              </div>
              <div className="text-xs text-slate-600">SAC Code</div>
            </div>
          </div>
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                  {item.ser_igst !== null ? "GST@" + item.ser_igst + "%" : '-'}
              </div>
              <div className="text-xs text-slate-600">GST %</div>
            </div>
          </div>
        </div>
      ))}
      <div className="heading text-slate-600 flex justify-between p-4 font-semibold mt-4">
        <div className="entry">Sales Entry</div>
        <div className="sales mr-60">Sales</div>
      </div>
      <div className="transactions">
        {data.map((item, index) => (
          <SerTran key={index} data={item} editSale={props.editSale} ser_unit={serUnit} />
        ))}
      </div>
      <div className="btn shadow-lg">
        <button onClick={props.record}>Record a Sale</button>
      </div>
    </div>
  );
};

export default SerRight;
