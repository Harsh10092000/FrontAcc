import { IconUsers } from "@tabler/icons-react";

const NoSelected = () => {
  return (
    <div className="w-full bg-slate-50 flex h-[100vh - 85px] flex-col justify-center items-center">
      <IconUsers className=" w-28 h-28 text-slate-600" />
      No Transaction Selected
    </div>
  );
};

export default NoSelected;
