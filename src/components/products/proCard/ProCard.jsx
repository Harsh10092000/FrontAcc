import { useContext } from "react";
import Img from "../../../assets/proIcon.png";
import { UserContext } from "../../../context/UserIdContext";
const ProCard = (props) => {
  const { changeProduct, pId } = useContext(UserContext);

  // const balStock = props.stockData
  //   .filter((item) => item.cnct_id === props.data.product_id)
  //   .reduce(function (prev, current) {
  //     if (current.product_stock_in) {
  //       return prev + +current.product_stock_in;
  //     } else {
  //       return prev - +current.product_stock_out;
  //     }
  //   }, 0);

  return (
    <div
      className={
        pId === props.data.product_id
          ? "bg-[#e8f0fe] cardItem cursor-pointer shadow"
          : "cardItem cursor-pointer"
      }
      onClick={() => changeProduct(props.data.product_id)}
    >
      <div
        className="flex justify-between  items-center p-3 "
        style={{ borderBottom: "1px solid rgb(245 245 245" }}
      >
        <div className="flex items-center gap-4 w-[200px]">
          <div className="icon">
            <img
              src={
                props.data.product_image
                  ? import.meta.env.VITE_BACKEND +
                    "/product/" +
                    props.data.product_image
                  : Img
              }
              className="w-7 object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg text-slate-700">
              {props.data.product_name}{" "}
            </span>
            {props.data.balStock <= props.data.low_stock ? (
              <span className=" bg-red-200 text-red-700 text-sm px-2">
                Low Stock
              </span>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="w-[95px]">
          <div className="text-slate-800 text-lg">
            ₹ {props.data.sale_price}
          </div>
        </div>
        <div className="w-[70px]">
          <div className="qty text-slate-800 text-lg">{props.data.balStock}</div>
        </div>
      </div>
    </div>
  );
};

export default ProCard;
