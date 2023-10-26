import ProCardTran from "../proCardTran/ProCardTran";
import ProTran from "../proTran/ProTran";
import "./proright.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";

const ProRight = (props) => {
  const { pId, change } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/fetchProductTran/${pId}`)
      .then((response) => {
        setResult(response.data);
      });
    axios
      .get(`http://localhost:8000/api/auth/fetchStockInTran/${pId}`)
      .then((response) => {
        setResult2(response.data);
        //setQtySold(response.data.qty_sold)
      });
  }, [pId, change]);

  console.log(result2);

  return (
    <div className="proright">
      {result.map((item, index) => (
        <>
          <div className="product">
            <ProCardTran
              pid={item.primary_id}
              product_name={
                item.product_name ? item.product_name : "Product Name"
              }
              data={item}
              edit={props.edit}
            />
          </div>

          <div className="details grid grid-cols-4 grid-rows-2" key={index}>
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  ₹{item.sale_price}
                </div>
                <div className="text-xs text-slate-600">Sale Price</div>
              </div>
            </div>
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  ₹{item.purchase_price}
                </div>
                <div className="text-xs text-slate-600">Purchase Price</div>
              </div>
            </div>
            <div className="grItems">
              <div className="flex flex-col items-center">
                {item.balance_stock <= item.low_stock ? (
                  <>
                    <div className="font-semibold text-lg text-red-600">
                      {item.balance_stock}
                    </div>
                    <div className="text-xs text-red-600">Stock Quantity</div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-lg text-slate-800">
                      {item.balance_stock.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-600">Stock Quantity</div>
                  </>
                )}
              </div>
            </div>
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  ₹{(item.sale_price * item.balance_stock).toFixed(2)}
                </div>
                <div className="text-xs text-slate-600">Stock Value</div>
              </div>
            </div>

            {item.secondary_unit ? (
              <div className="grItems">
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-lg text-slate-800">
                    {item.primary_unit + " - " + item.secondary_unit}
                  </div>
                  <div className="text-xs text-slate-600">Units</div>
                </div>
              </div>
            ) : (
              <div className="grItems">
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-lg text-slate-800">
                    {item.primary_unit ? item.primary_unit : "-"}
                  </div>
                  <div className="text-xs text-slate-600">Units</div>
                </div>
              </div>
            )}
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  {item.low_stock + " " + item.primary_unit}
                </div>
                <div className="text-xs text-slate-600">Low Stock</div>
              </div>
            </div>
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  {item.hsn_code ? item.hsn_code : "-"}
                </div>
                <div className="text-xs text-slate-600">HSN Code</div>
              </div>
            </div>
            <div className="grItems">
              <div className="flex flex-col items-center">
                <div className="font-semibold text-lg text-slate-800">
                  {item.igst >= 0 && item.igst !== null && item.igst !== ""
                    ? "GST @ " + item.igst + "%"
                    : "-"}
                </div>
                <div className="text-xs text-slate-600">GST%</div>
              </div>
            </div>
          </div>
        </>
      ))}

      <div className="heading text-slate-600 flex justify-between p-4 font-semibold">
        <div className="entry">Stock Entry</div>
        <div className="flex gap-40 mr-24">
          <div className="gave">Stock Out</div>
          <div className="get">Stock In</div>
        </div>
      </div>
      <div className="transactions">
        {result2.map((item, index) => (
          <ProTran key={index} data={item} />
        ))}
      </div>
      <div className="btn shadow-lg">
        <button className="pay text-red-600" onClick={props.out}>
          Stock Out
        </button>
        <button className="receive text-green-600 " onClick={props.in}>
          Stock In
        </button>
      </div>
    </div>
  );
};

export default ProRight;
