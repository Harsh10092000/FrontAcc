import React from "react";

const PurchaseRepTran = (props) => {
  return (
    // <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
    // <div className="p-4">{props.data.purchase_date}</div>
    // <div className="p-4">{props.data.purchase_prefix_no}</div>
    // <div className="p-4">{props.data.purchase_name}</div>
    // <div className="p-4">Purchase</div>
    // <div className="p-4 capitalize">{props.data.purchase_amt_type}</div>
    // <div className="p-4">
    //   ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
    // </div>
    // <div className="p-4">
    //   ₹ {parseFloat(props.data.purchase_amt_due).toFixed(2)}
    // </div>
    // </div>
    <div>
      {props.data.purchase_pay_out_id === null &&
      props.data.purchase_re_id === null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
          <div className="p-4">{props.data.purchase_date}</div>
          <div className="p-4">{props.data.purchase_prefix_no}</div>
          <div className="p-4">{props.data.purchase_name}</div>
          <div className="p-4">Purchase</div>
          <div className="p-4 capitalize">{props.data.purchase_amt_type}</div>
          <div className="p-4">
            ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
          </div>
          <div className="p-4">
            ₹ {parseFloat(props.data.purchase_amt).toFixed(2)}
          </div>
        </div>
      ) : props.data.purchase_pay_out_id !== null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
          <div className="p-4">{props.data.purchase_date}</div>
          <div className="p-4">{props.data.purchase_prefix_no}</div>
          <div className="p-4">{props.data.purchase_name}</div>
          <div className="p-4">Payment Out</div>
          <div className="p-4 capitalize">{props.data.purchase_amt_type}</div>
          <div className="p-4">
            ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
          </div>
          <div className="p-4">-</div>
        </div>
      ) : props.data.purchase_re_id !== null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
          {console.log("Fgdf")}
          <div className="p-4">{props.data.purchase_date}</div>
          <div className="p-4">{props.data.purchase_prefix_no}</div>
          <div className="p-4">{props.data.purchase_name}</div>
          <div className="p-4">Payment Return</div>
          <div className="p-4 capitalize">{props.data.purchase_amt_type}</div>
          <div className="p-4">-</div>
          <div className="p-4">
            ₹ {parseFloat(props.data.purchase_amt_paid).toFixed(2)}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PurchaseRepTran;
