import { IconBriefcase, IconPlus } from "@tabler/icons-react";
import img from "../../../assets/Account.jpg";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserIdContext";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
const SettingAccount = () => {
  
  const { currentUser } = useContext(AuthContext);
  const {
    changeAccountId,
  } = useContext(UserContext);

  const [info, setInfo] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchStaffData/${currentUser[0].log_id}`)
      .then((res) => {
        setStaffData(res.data);
      });
  }, [currentUser[0].log_id]);

  useEffect(() => {
    if (staffData.length > 0) {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetchData/${staffData[0].staff_acc_id}`)
      .then((res) => {
        setInfo(res.data);
      });
    } else {
      axios
      .get(import.meta.env.VITE_BACKEND + `/api/act/fetch/${currentUser[0].log_id}`)
      .then((res) => {
        setInfo(res.data);
      });
    }
  }, [staffData]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-5">
        <div className="p-5 bg-teal-300/20 rounded text-teal-600">
          <IconBriefcase />
        </div>
        <div className="text-xl">Account Settings</div>
      </div>
      <div className="bg-slate-100 mx-5 rounded-2xl p-5 h-[80vh] grid grid-cols-2 grid-rows-2 gap-5">

      {info.map((item, index) => (
        <div className="border border-slate-300 rounded bg-white p-4 " key={index}>
          <div className="flex justify-center">
            <img src={
                    import.meta.env.VITE_BACKEND +
                    "/account/" +
                    item.business_logo
                  } alt="" className="w-32 h-32 rounded-full" />
          </div>
          <h2 className="text-center text-3xl font-semibold mt-3">
          {item.business_name}
          </h2>
          <p className="text-center text-gray-600 mt-1 capitalize">
          {item.business_type.replaceAll("_", " ")}
          </p>
          <p className="text-center text-gray-600 mt-1">{item.business_address}</p>
          <div className="mt-5">
            <div className="flex justify-between mt-5">
              <div className="font-semibold">
                GST :&nbsp;
                <span className=" font-thin">{item.business_gst}</span>
              </div>
              <div className="font-semibold">
                Business Nature :
                <span className="font-thin capitalize">{item.business_nature.replace("_", " ")}</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 w-full">
           
            <motion.button
              className="w-full bg-blue-600/70 p-2 text-white"
              //whileTap={{ scale: 0.99 }}
              onClick={() => changeAccountId(item.business_id)}
            >
              Use this account
            </motion.button>
          </div>
          {/* <div className="px-2 py-4 w-full">
            <button
            type="button"
              className="w-full bg-blue-600/70 p-2 text-white"
              //whileTap={{ scale: 0.99 }}
              onClick={() => ( changeAccountId(item.business_id))}
            >
              Use this account
              </button>
          </div> */}
        </div>
        ))}
        
        <div className="border border-dashed border-black rounded  p-4 flex justify-center items-center">
        <Link to="/addAccount">
          <motion.div
            className="p-5 bg-white rounded-full cursor-pointer text-black shadow "
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring" }}
          >
            <IconPlus className="w-12 h-12" />
          </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingAccount;
