const CashRepTran = (props) => {
  return (
    <div className="grid grid-cols-4 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
      <div className="p-4">{props.data.cash_date}</div>
      <div className="p-4 text-green-600">
        ₹ {props.data.receive_sum ? props.data.receive_sum.toFixed(2) : "0"}
      </div>
      <div className="p-4 text-red-600">
        ₹ {props.data.pay_sum ? props.data.pay_sum.toFixed(2) : "0"}
      </div>
      <div
        className={
          props.data.receive_sum - props.data.pay_sum > 0
            ? "p-4 text-green-600"
            : "p-4 text-red-600"
        }
      >
        ₹ {(props.data.receive_sum - props.data.pay_sum).toFixed(2)}
      </div>
    </div>
  );
};

export default CashRepTran;
