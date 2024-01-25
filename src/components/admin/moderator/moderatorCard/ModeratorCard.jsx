import { IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserIdContext";

const ModeratorCard = (props) => {
  const { modId, setModId } = useContext(UserContext);

  return (
    <motion.div
      className="flex  w-full hover:bg-slate-100  hover:shadow-slate-600 px-2 pr-8 py-2 rounded-xl justify-between "
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" }}
      onClick={(e) => {
        setModId(props.data.mod_id);
      }}
    >
      <div className="flex gap-3 pl-1 pt-1 ">
        <div className="rounded-full p-2 text-purple-600 bg-purple-300/50 w-10 h-10">
          <IconUser />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl  pt-0.5 items-end">{props.data.mod_name}</div>
          <div className="text-sm ">{props.data.mod_access}</div>
        </div>
      </div>
      <div className="text-sm text-slate-600">
        <div>Bills - {props.data.mod_permission}</div>
        <div>Bills - No Access</div>
        <div>Bills - No Access</div>
      </div>
    </motion.div>
  );
};

export default ModeratorCard;
