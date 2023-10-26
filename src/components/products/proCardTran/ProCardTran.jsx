import { IconEdit } from "@tabler/icons-react";
import Img from "../../../assets/proIcon.png";
import "./procardtran.scss";

const ProCardTran = (props) => {
  return (
    <div className="cardItem1 cursor-pointer">
      <div
        className="flex justify-between  items-center p-3 "
        style={{ borderBottom: "1px solid rgb(245 245 245" }}
      >
        <div className="flex items-center gap-4">
          <div className="icon">
            <img
              src={
                props.data.product_image
                  ? "http://localhost:8000/product/" + props.data.product_image
                  : Img
              }
              className="w-7"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg text-slate-700">{props.product_name}</span>
          </div>
        </div>
        <button
          className="flex gap-1 items-center editbtn text-blue-600"
          onClick={props.edit}
        >
          <IconEdit />
          Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProCardTran;
