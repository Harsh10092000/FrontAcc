import { IconCash } from "@tabler/icons-react";
import { UserContext } from "../../../context/UserIdContext";
import { useContext } from "react";

const ExTran = (props) => {
  const { expId, changeExpId } = useContext(UserContext);
  return (
    <div
      className={
        expId === props.data.exp_id
          ? "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran bg-[#eafff4]"
          : "grid grid-cols-3 cursor-pointer p-4 border-b border-slate-100 cashtran"
      }
      onClick={() => changeExpId(props.data.exp_id)}
    >
      <div className="flex col-span-2 gap-3">
        <div className="notes rounded-full bg-emerald-100 w-12 h-12 flex items-center justify-center">
          <IconCash className="text-emerald-600" />
        </div>
        <div className="details flex flex-col gap-1 ">
          <div className="category font-semibold text-slate-700">
            {props.data.exp_category}
            <div className="text-xs p-[2px] border border-slate-200 rounded text-slate-600 mr-4">
            {props.data.exp_prefix} #{props.data.exp_prefix_no}
            </div>
          </div>
          <div className="text-sm text-slate-500 font-semibold">
            {props.data.exp_date}
          </div>
        </div>
      </div>
      <div className="text-slate-600 justify-self-end font-semibold">
        ₹ {props.data.exp_total}
      </div>
    </div>
  );
};

export default ExTran;
