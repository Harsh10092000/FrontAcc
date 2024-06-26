import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserIdContext";

const AdminLogin = () => {
  const {
    changeAdminId,
    changeAdminType,
    changeAdminAccAccess,
    changeAdminGstAccess,
    changeAdminPayAccess,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [adminData, SetAdminData] = useState([]);
  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  const checkUser = () => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/verifyAdmin/${data.email}`)
      .then((res) => {
        SetAdminData(res.data);
        changeAdminId(res.data[0].super_id),
          changeAdminType(res.data[0].super_type);
        //changeAdminAccess(res.data[0].super_access);
        if (res.data[0].super_type === 0) {
          changeAdminAccAccess(res.data[0].mod_accounts),
          changeAdminGstAccess(res.data[0].mod_gst),
          changeAdminPayAccess(res.data[0].mod_payplan);
        } else {
          changeAdminAccAccess(2);
          changeAdminGstAccess(2);
          changeAdminPayAccess(2);
        }
      });
  };

  useEffect(() => {
    if (adminData.length > 0) {
      localStorage.setItem("admin", JSON.stringify(adminData));
      navigate("/admin/account");
    }
  }, [adminData]);
  return (
    <motion.div className="bg-no-repeat bg-cover bg-center relative front">
      <div className="absolute bg-gradient-to-b from-blue-500 to-blue-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <h1 className="mb-3 font-bold text-5xl">AccBook</h1>
            <p className="pr-3">
              Using a digital-first approach while keeping the needs of the
              merchants of Bharat at the centre of product design, has helped
              With this momentum, Accbook is poised to become a strong
              distribution platform for other services and products tailored to
              India's merchants.
            </p>
          </div>
        </div>
        <motion.div
          className="flex justify-center self-center z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 0, transition: { duration: 0.2 } }}
        >
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <motion.input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type=""
                  placeholder="mail@gmail.com"
                  whileTap={{ scale: 0.97 }}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <motion.input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  type=""
                  placeholder="Enter your Password..."
                  whileTap={{ scale: 0.97 }}
                  onChange={(e) => setData({ ...data, pass: e.target.value })}
                />
              </div>

              <div>
                <motion.button
                  className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition"
                  whileTap={{ scale: 0.9 }}
                  onClick={checkUser}
                >
                  Sign In
                </motion.button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>Copyright © 2023-2024 Accbook</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
