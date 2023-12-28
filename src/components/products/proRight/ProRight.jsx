import ProCardTran from "../proCardTran/ProCardTran";
import ProTran from "../proTran/ProTran";
import "./proright.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { Skeleton } from "@mui/material";

const ProRight = (props) => {
  const { pId, change, inventory } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [openingStock, setOpeningStock] = useState([]);
  const [result2, setResult2] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchProductTran/${pId}`)
      .then((response) => {
        setResult(response.data[0]);
        setOpeningStock(response.data[0].opening_stock);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/auth/fetchStockInTran/${pId}`)
      .then((response) => {
        setResult2(response.data);
      });
  }, [pId, change]);

  const balStock = result2.reduce(function (prev, current) {
    if (current.product_stock_in) {
      return prev + +current.product_stock_in;
    } else {
      return prev - +current.product_stock_out;
    }
  }, 0);

  return (
    <div className="proright">
      <div className="product">
        <ProCardTran
          pid={result ? result.primary_id : 0}
          product_name={result ? result.product_name : "Product Name"}
          data={result}
          edit={props.edit}
          skeleton={skeleton}
          inventory={inventory}
        />
      </div>

      <div className="details grid grid-cols-4 grid-rows-2">
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : (
                "₹ " + result.sale_price
              )}
            </div>
            <div className="text-xs text-slate-600">Sale Price</div>
          </div>
        </div>
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : (
                "₹ " + result.purchase_price
              )}
            </div>
            <div className="text-xs text-slate-600">Purchase Price</div>
          </div>
        </div>
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div
              className={
                result.balance_stock <= result.low_stock
                  ? "font-semibold text-lg text-red-600"
                  : "font-semibold text-lg"
              }
            >
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : (
                balStock
              )}
            </div>
            <div
              className={
                balStock <= result.low_stock
                  ? "text-xs text-red-600"
                  : "text-xs "
              }
            >
              Stock Quantity
            </div>
          </div>
        </div>
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : (
                "₹ " + (result.sale_price * result.balance_stock).toFixed(2)
              )}
            </div>
            <div className="text-xs text-slate-600">Stock Value</div>
          </div>
        </div>

        {skeleton ? (
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              </div>
              <div className="text-xs text-slate-600">Units</div>
            </div>
          </div>
        ) : result.secondary_unit ? (
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                {result.primary_unit + " - " + result.secondary_unit}
              </div>
              <div className="text-xs text-slate-600">Units</div>
            </div>
          </div>
        ) : (
          <div className="grItems">
            <div className="flex flex-col items-center">
              <div className="font-semibold text-lg text-slate-800">
                {result.primary_unit ? result.primary_unit : "-"}
              </div>
              <div className="text-xs text-slate-600">Units</div>
            </div>
          </div>
        )}
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : (
                result.low_stock + " " + result.primary_unit
              )}
            </div>
            <div className="text-xs text-slate-600">Low Stock</div>
          </div>
        </div>
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : result.hsn_code ? (
                result.hsn_code
              ) : (
                "-"
              )}
            </div>
            <div className="text-xs text-slate-600">HSN Code</div>
          </div>
        </div>
        <div className="grItems">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg text-slate-800">
              {/* {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : result.igst >= 0 &&
                result.igst !== null &&
                result.igst !== "" ? (
                "GST @ " + result.igst + "%"
              ) : (
                "-"
              )} */}

              {skeleton ? (
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={20}
                  className="mb-2"
                />
              ) : result.igst > 0 && result.cess > 0 ? (
                result.igst + "%" + " +" + result.cess + "%"
              ) : (
                result.igst > 0 ? (
                  "GST @ " + result.igst + "%"
                ) : ""
              )}
            </div>
            <div className="text-xs text-slate-600">GST%</div>
          </div>
        </div>
      </div>

      <div className="heading text-slate-600 flex justify-between p-4 font-semibold">
        <div className="entry">Stock Entry</div>
        <div className="flex gap-40 mr-24">
          <div className="gave">Stock Out</div>
          <div className="get">Stock In</div>
        </div>
      </div>

      <div className="transactions">
        {result2.map((item, index) => {
          const sum = result2
            .filter((filteredItem) => filteredItem.tran_id <= item.tran_id)
            .reduce(function (prev, current) {
              if (current.product_stock_in) {
                return prev + +current.product_stock_in;
              } else {
                return prev - +current.product_stock_out;
              }
            }, 0);
          return <ProTran key={index} data={item} balanceStock={sum} />;
        })}
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
