const SalesRepTran = (props) => {
  return (
    <div>
      {props.data.sale_payment_in_id === null &&
      props.data.sale_re_id === null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
          <div className="p-4">{props.data.sale_date}</div>
          <div className="p-4">{props.data.sale_prefix_no}</div>
          <div className="p-4">{props.data.sale_name}</div>
          <div className="p-4">Sale</div>
          <div className="p-4 capitalize">{props.data.sale_amt_type}</div>
          <div className="p-4">
            ₹ {parseFloat(props.data.sale_amt).toFixed(2)}
          </div>
          <div className="p-4">
            ₹ {parseFloat(props.data.sale_amt).toFixed(2)}
          </div>
        </div>
      ) : props.data.sale_payment_in_id !== null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
          <div className="p-4">{props.data.sale_date}</div>
          <div className="p-4">{props.data.sale_prefix_no}</div>
          <div className="p-4">{props.data.sale_name}</div>
          <div className="p-4">Payment In</div>
          <div className="p-4 capitalize">{props.data.sale_amt_type}</div>
          <div className="p-4">
            ₹ {parseFloat(props.data.sale_amt_paid).toFixed(2)}
          </div>
          <div className="p-4">
            -
          </div>
        </div>
      ) : props.data.sale_re_id !== null ? (
        <div className="grid grid-cols-7 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
        
          <div className="p-4">{props.data.sale_date}</div>
          <div className="p-4">{props.data.sale_prefix_no}</div>
          <div className="p-4">{props.data.sale_name}</div>
          <div className="p-4">Payment Return</div>
          <div className="p-4 capitalize">{props.data.sale_amt_type}</div>
          <div className="p-4">
            -
          </div>
          <div className="p-4">
          ₹ {parseFloat(props.data.sale_amt_paid).toFixed(2)}
          </div>
        </div>
       ) : ""}
    </div>
  );
};

export default SalesRepTran;
