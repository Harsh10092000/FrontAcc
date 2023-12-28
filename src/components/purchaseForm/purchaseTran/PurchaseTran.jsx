
import { IconTrash } from "@tabler/icons-react";

const PurchaseTran = (props) => {
  let i = 1;
  return (
    <>
      {props.filteredInvoiceItems.map((item) => (
        <div className="grid grid-cols-9 text-center border-b border-slate-300 hover:shadow hover:bg-slate-100">
          <div className="border-r border-slate-300 p-4">{i++}</div>
          <div className="border-r border-slate-300 p-4">{item.in_items}</div>

          <div className="border-r border-slate-300 p-4">{item.in_hsn_sac ? item.in_hsn_sac : "-"}</div>
          <div className="border-r border-slate-300 p-4">
            {item.in_qty} | {item.in_unit}
          </div>
          <div className="border-r border-slate-300 p-4">
            {item.in_purchase_price} | {parseFloat(item.in_discount_price).toFixed(2)}
          </div>
          {item.in_discount_value ? (
            <div className="border-r border-slate-300 p-4">
              {item.in_discount_value} |{" "}
              {item.in_discount_unit === "amount" ? "₹" : "%"}
            </div>
          ) : (
            <div className="border-r border-slate-300 p-4">-</div>
          )}
          
          <div className="border-r border-slate-300 p-4">
            {item.in_gst_prectentage && item.in_gst_prectentage !== null && item.in_gst_prectentage !== "-" 
              ? item.in_gst_prectentage + "% |" + parseFloat(item.in_gst_amt).toFixed(2)
              : "-"}
          </div>
          <div className="border-r border-slate-300 p-4">
            
            ₹
            {(
              parseInt(item.in_qty) *
              (parseFloat(item.in_discount_price ) +
                parseFloat(item.in_gst_amt ? item.in_gst_amt : 0))
            ).toFixed(2)}
          
          </div>
          <div className="grid place-items-center">
            <div className="border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-all ease-in-out w-10">
              <IconTrash />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PurchaseTran;
