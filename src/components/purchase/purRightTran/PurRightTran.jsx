
const PurRightTran = (props) => {
    return (
      <div>
        
        {console.log(props.purchase_pay_out_id, props.purchase_re_id )}
        {props.purchase_pay_out_id === null && props.purchase_re_id === undefined ? (
          <div className="flex justify-between border-b px-7 py-4">
            <div className="">
              <div className="details flex flex-col gap-1 ">
                <div className="category font-semibold ">
                  {props.data.purchase_item_name}
                  
                </div>
                <div className="text-sm text-slate-700 font-semibold">
                  Qty : {props.data.purchase_item_qty}
                </div>
              </div>
            </div>
            <div className=" justify-self-end flex-col">
              <div className="text-slate-700 font-semibold">
                ₹
                {(
                  parseFloat(props.data.purchase_item_qty) *
                  (parseFloat(props.data.purchase_item_disc_price) +
                    parseFloat(
                      props.data.purchase_item_gst_amt
                        ? props.data.purchase_item_gst_amt
                        : 0
                    ))
                ).toFixed(2)}
              </div>
  
              <div className="text-sm text-slate-500">
                {props.data.purchase_item_disc_val != null
                  ? props.data.purchase_item_disc_unit === "Amount"
                    ? "Discount ₹ " + props.data.purchase_item_disc_val
                    : "Discount " + props.data.purchase_item_disc_val + "%"
                  : ""}
              </div>
              <div className="text-sm text-slate-500">
                {props.data.purchase_item_gst === "-"
                  ? ""
                  : "GST " + props.data.purchase_item_gst + "%"}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between border-b px-7 py-4">
            <div className="">
              <div className="details flex flex-col gap-1 ">
                <div className="category font-semibold ">Adjusted In</div>
                <div className="text-sm text-slate-700 font-semibold">
                  {props.purchase_prefix} #{props.purchase_prefix_no}
        
                </div>
              </div>
            </div>
            <div className=" justify-self-end flex-col">
              <div className="text-slate-700 font-semibold">
                ₹
                {parseFloat(props.purchase_amt_paid
                ).toFixed(2)}
              </div>
  
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PurRightTran;
  
  