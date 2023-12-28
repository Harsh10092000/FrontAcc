import { IconReportMoney } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";

const PurTran = (props) => {
  const { purchaseId, changePurchaseId } = useContext(UserContext);

  const totalAmtPaid = props.allTran
    .filter(
      (filteredItem) =>
        parseInt(filteredItem.purchase_pay_out_id) ===
        parseInt(props.data.purchase_id)
    )
    .reduce(function (prev, current) {
      return prev + +current.purchase_amt_paid;
    }, 0);

  return (
    <div>
      {props.data.purchase_pay_out_id !== null ||
      props.data.purchase_re_id !== null ? (
        <div
          className={
            purchaseId === props.data.purchase_id
              ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
              : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
          }
          onClick={() => {
            changePurchaseId(props.data.purchase_id);
          }}
        >
          <div className="flex col-span-2 gap-3">
            <div className="notes rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
              <IconReportMoney className="text-sky-600" />
            </div>
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold text-slate-700">
                {props.data.purchase_name}
                <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
                  {props.data.purchase_pay_out_id !== null
                    ? props.data.purchase_pay_out_prefix +
                      "#" +
                      props.data.purchase_pay_out_prefix_no
                    : props.data.purchase_re_prefix +
                      "#" +
                      props.data.purchase_re_prefix_no}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {props.data.purchase_date}
              </div>
            </div>
          </div>
          {/* <div className="text-slate-600 justify-self-end font-semibold">
            ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
          </div> */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-slate-600 justify-self-end font-semibold">
              ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {props.data.purchase_amt_type}
            </div>
          </div>
          
        </div>
      ) : (
        <div
          className={
            purchaseId === props.data.purchase_id
              ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#d6f6fc83]"
              : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
          }
          onClick={() => {
            changePurchaseId(props.data.purchase_id);
          }}
        >
          <div className="flex col-span-2 gap-3">
            <div className="notes rounded-full bg-sky-100 w-12 h-12 flex items-center justify-center">
              <IconReportMoney className="text-sky-600" />
            </div>
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold text-slate-700">
                {props.data.purchase_name}
                <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
                  {props.data.purchase_prefix} #{props.data.purchase_prefix_no}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-semibold">
                {props.data.purchase_date}
              </div>
            </div>
          </div>
          {/* <div className="text-slate-600 justify-self-end font-semibold">
      ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
    </div> */}
          <div className="flex flex-col items-end gap-1">
            <div className="text-slate-600 justify-self-end font-semibold">
              ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
            </div>
            <div className="text-slate-700 text-xs">
              {totalAmtPaid === 0
                ? "Unpaid"
                : totalAmtPaid < props.data.purchase_amt
                ? "Partially Paid"
                : "Fully Paid"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurTran;
