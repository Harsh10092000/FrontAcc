import { IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserIdContext";
 const ModeratorObj = (props) => {
  const {changeModeratorId} = useContext(UserContext);
  return (
    <motion.div
      className="px-3 py-1 flex justify-between items-center m-1 hover:shadow rounded-xl hover:bg-violet-100/50 hover:shadow-violet-300 bg-white h-[80px] cursor-pointer"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" }}
      onClick={() => changeModeratorId(props.data.mod_id)}
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-violet-300/20 flex justify-center items-center rounded-full text-violet-600">
          <IconUser />
        </div>
        <div >
          <div className="text-lg">
          {props.data.mod_name}
          </div>
          <div className=" text-sm">
          {props.data.mod_email}
          </div>
          </div>
        
      </div>
      <div>
        <div>Accounts - {props.data.mod_accounts === 0 ? "No Access" : props.data.mod_accounts === 1 ? "Limited" : "Full"}</div>
        <div>Gst Codes - {props.data.mod_gst === 0 ? "No Access" : props.data.mod_gst === 1 ? "Limited" : "Full"}</div>
        <div>Payment Plan - {props.data.mod_payplan === 0 ? "No Access" : props.data.mod_payplan === 1 ? "Limited" : "Full"}</div>

      </div>
    </motion.div>
  );
};

export default ModeratorObj ;