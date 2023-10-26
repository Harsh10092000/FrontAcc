const ExpensesRightTran = (props) => {
  return (
    <>
      <div className="flex justify-between border-b px-7 py-4">
        <div className="">
          <div className="details flex flex-col gap-1 ">
            <div className="category font-semibold ">
              {props.data.exp_item_name}
            </div>
            <div className="text-sm text-slate-700 font-semibold">
              Qty : {props.data.exp_item_qty}
            </div>
          </div>
        </div>
        <div className="text-slate-700 justify-self-end font-semibold">
          ₹ {props.data.exp_item_price * props.data.exp_item_qty}
        </div>
      </div>
    </>
  );
};

export default ExpensesRightTran;
