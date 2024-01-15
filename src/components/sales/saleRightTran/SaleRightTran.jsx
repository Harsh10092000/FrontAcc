const SaleRightTran = (props) => {
  return (
    <div>
      
      {props.sale_payment_in_id === null ? (
        <div className="flex justify-between border-b px-7 py-4">
          <div className="">
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold ">
                {props.data.sale_item_name}
                
              </div>
              <div className="text-sm text-slate-700 font-semibold">
                Qty : {props.data.sale_item_qty}
              </div>
            </div>
          </div>
          <div className=" justify-self-end flex-col">
            <div className="text-slate-700 font-semibold">
              ₹
              {(
                parseFloat(props.data.sale_item_qty) *
                (parseFloat(props.data.sale_item_disc_price) +
                  parseFloat(
                    props.data.sale_item_gst_amt
                      ? props.data.sale_item_gst_amt
                      : 0
                  ))
              ).toFixed(2)}
            </div>

            <div className="text-sm text-slate-500">
              {props.data.sale_item_disc_val != null
                ? props.data.sale_item_disc_unit === "amount"
                  ? "Discount ₹ " + props.data.sale_item_disc_val
                  : "Discount " + props.data.sale_item_disc_val + "%"
                : ""}
            </div>
            <div className="text-sm text-slate-500">
              {props.data.sale_item_gst === "-"
                ? ""
                : "GST " + props.data.sale_item_gst + "%"}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between border-b px-7 py-4">
          <div className="">
            <div className="details flex flex-col gap-1 ">
              <div className="category font-semibold ">Adjusted In</div>
              <div className="text-sm text-slate-700 font-semibold">
                {props.sale_prefix} #{props.sale_prefix_no}
              </div>
            </div>
          </div>
          <div className=" justify-self-end flex-col">
            <div className="text-slate-700 font-semibold">
              ₹
              {parseFloat(props.sale_amt_paid
              ).toFixed(2)}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SaleRightTran;

