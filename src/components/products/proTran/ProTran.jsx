import { IconPointFilled } from "@tabler/icons-react";

const ProTran = (props) => {
  
  return (
    <div className="transaction cursor-pointer">
      
      <div className="details flex flex-col gap-1 ">
        <div className="date font-semibold flex items-center gap-1 text-slate-800">
          {props.data.entry_date}
          <IconPointFilled className="w-3 h-3" />
          10:40 AM
        </div>
        <div className="text-sm text-slate-600">
          Balance : {props.data.balance_stock}
        </div>
      </div>
      <div className="flex gap-56 mr-24">
       
        <div>
          <span className="text-slate-600">
            {props.data.product_stock_out ? "OUT " + props.data.product_stock_out +" "+ props.data.selected_unit : ""}
          </span>
          <div className="text-red-600">
            {props.data.sale_price ? "₹ " + props.data.sale_price : ""}
          </div>
        </div>
        <div>
          <span className="text-slate-600">
            {props.data.product_stock_in ? "IN " + props.data.product_stock_in +" "+ props.data.selected_unit : ""}
          </span>
          <div className="text-green-600">
            {props.data.purchase_price ? "₹ " + props.data.purchase_price : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProTran;
