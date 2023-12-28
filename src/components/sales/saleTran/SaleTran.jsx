import { IconReportMoney } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";

const SaleTran = (props) => {
  const { saleId, changeSaleId } = useContext(UserContext);

  const totalAmtPaid = props.allTran
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.sale_payment_in_id) ===
        parseInt(props.data.sale_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.sale_amt_paid;
    }, 0);

  return (
    <div>
      {props.data.sale_payment_in_id !== null ||
      props.data.sale_re_id !== null ? (
        <div
          className={
            saleId === props.data.sale_id
              ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
              : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
          }
          onClick={() => {
            changeSaleId(props.data.sale_id);
          }}
        >
          <div className="flex col-span-2 gap-3">
            <div className="notes rounded-full bg-cyan-100 w-12 h-12 flex items-center justify-center">
              <IconReportMoney className="text-cyan-600" />
            </div>
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold text-slate-700">
                {props.data.sale_name}
                <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
                  {props.data.sale_payment_in_prefix !== null
                    ? props.data.sale_payment_in_prefix +
                      "#" +
                      props.data.sale_payment_in_prefix_no
                    : props.data.sale_re_prefix +
                      "#" +
                      props.data.sale_re_prefix_no}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {props.data.sale_date}
              </div>
            </div>
          </div>
          {/* <div className="text-slate-600 justify-self-end font-semibold">
            ₹ {parseFloat(props.data.sale_amt_paid).toFixed(2)}
          </div> */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-slate-600 justify-self-end font-semibold">
              ₹ {parseFloat(props.data.sale_amt_paid).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {props.data.sale_amt_type}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            saleId === props.data.sale_id
              ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
              : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
          }
          onClick={() => {
            changeSaleId(props.data.sale_id);
          }}
        >
          <div className="flex col-span-2 gap-3">
            <div className="notes rounded-full bg-cyan-100 w-12 h-12 flex items-center justify-center">
              <IconReportMoney className="text-cyan-600" />
            </div>
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold text-slate-700">
                {props.data.sale_name}
                <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
                  {props.data.sale_prefix} #{props.data.sale_prefix_no}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {props.data.sale_date}
              </div>
            </div>
          </div>
          {/* <div className="text-slate-600 justify-self-end font-semibold">
            ₹ {parseFloat(props.data.sale_amt).toFixed(2)}
          </div> */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-slate-600 justify-self-end font-semibold">
              ₹ {parseFloat(props.data.sale_amt).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {totalAmtPaid === 0
                ? "Unpaid"
                : parseFloat(totalAmtPaid).toFixed(2) < parseFloat(props.data.sale_amt).toFixed(2)
                ? "Partially Paid"
                : "Fully Paid"}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default SaleTran;
