const CustTran = (props) => {
  return (
    <div className="grid grid-cols-5 text-center border-b border-slate-300 hover:shadow hover:bg-blue-100/50 cursor-pointer">
      <div className="p-4">{props.data.tran_date}</div>
      <div className="p-4">{props.data.cust_name}</div>
      <div className="p-4">-</div>
      <div className="p-4">
        ₹ {props.data.tran_pay ? props.data.tran_pay : "0"}
      </div>
      <div className="p-4">
        ₹ {props.data.tran_receive ? props.data.tran_receive : "0"}
      </div>
    </div>
  );
};

export default CustTran;
