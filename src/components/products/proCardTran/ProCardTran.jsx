import { IconEdit } from "@tabler/icons-react";
import Img from "../../../assets/proIcon.png";
import "./procardtran.scss";
import { Skeleton } from "@mui/material";

const ProCardTran = (props) => {
  
  return (
    <div className="cardItem1 cursor-pointer">
      <div
        className="flex justify-between  items-center p-3 "
        style={{ borderBottom: "1px solid rgb(245 245 245" }}
      >
        <div className="flex items-center gap-4">
          {props.skeleton ? (
            <Skeleton variant="circular" width={50} height={50} />
          ) : (
            <div className="icon">
              <img
                src={
                  props.data.product_image
                    ? import.meta.env.VITE_BACKEND +
                      "/product/" +
                      props.data.product_image
                    : Img
                }
                className="w-7"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <span className="text-lg text-slate-700">
              {props.skeleton ? (
                <Skeleton variant="rectangular" width={60} height={20} />
              ) : (
                props.product_name
              )}
            </span>
          </div>
        </div>
        {props.skeleton ? (
          <Skeleton variant="rounded" width={140} height={48} />
        ) : (
          <button
            disabled={props.inventory === 2 ? false : true}
            className="flex gap-1 items-center editbtn text-blue-600"
            onClick={props.edit}
          >
            <IconEdit />
            Edit Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProCardTran;
