import { IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserIdContext";
const StaffObj = (props) => {
  const { change , accountId, staffId , changeStaffId} = useContext(UserContext);
  return (
    <motion.div
      className="px-3 py-1 flex justify-between items-center m-1 hover:shadow rounded-xl hover:bg-violet-100/50 hover:shadow-violet-300 bg-white h-[80px] cursor-pointer"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" }}
      onClick={() => changeStaffId(props.data.staff_id)}
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-violet-300/20 flex justify-center items-center rounded-full text-violet-600">
          <IconUser />
        </div>
        <div >
          <div className="text-lg">
          {props.data.staff_name}
          </div>
          <div className=" text-sm">
          {props.data.staff_email}
          </div>
          </div>
        
      </div>
      <div>
        <div>Parties - {props.data.staff_parties === 0 ? "No Access" : props.data.staff_parties === 1 || props.data.staff_parties === 2 ? "Limited" : "Full"}</div>
        <div>Inventory - {props.data.staff_inventory === 0 ? "No Access" : props.data.staff_inventory === 1 ? "Limited" : "Full"}</div>
        <div>Bills - {props.data.staff_bills === 0 ? "No Access" : props.data.staff_bills === 1 ? "Limited" : "Full"}</div>
      </div>
    </motion.div>
  );
};

export default StaffObj;
