import { useContext, useEffect, useState } from "react";
import "./login.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserIdContext";

const Login = () => {
  const {
    changeAccountId,
    changeParties,
    changeInventory,
    changeBills,
    changeUId,
    changeAccess,
    changeUserType,
  } = useContext(UserContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(0);
  const [cotp, setCotp] = useState(0);
  const [email, setEmail] = useState("");
  const [otpdrop, setOtpdrop] = useState(false);
  const [otpmsg, setOtpmsg] = useState("Next");
  const [otpError, setOtpError] = useState(false);
  const [seconds, setSeconds] = useState(5);

  const fetchOtp = () => {
    try {
      setOtpdrop(true);
      setOtpmsg("Resend Otp");
      axios
        .get(import.meta.env.VITE_BACKEND + `/api/log/sendmail/${email}`)
        .then((res) => {
          setCotp(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  let userData = 0;
  const checklogin = async () => {
    if (otp.length > 5) {
      try {
        userData = await login(email, otp);
        if (userData !== 0) {
          setOtpError(false);
          changeAccountId(userData[0].business_id);
          changeUId(userData[0].log_id);
          changeAccess(userData[0].access);
          changeUserType(userData[0].log_user);
          if (userData[0].log_user === 0) {
            changeParties(userData[0].staff_parties);
            changeBills(userData[0].staff_bills);
            changeInventory(userData[0].staff_inventory);
          }
          if (
            parseInt(userData[0].access) !== 0 ||
            userData[0].access === undefined ||
            userData[0].access === null
          ) {
            if (userData[0].business_id) {
              navigate("/");
            } else {
              navigate("/addAccount");
            }
          } else {
            navigate(
              userData[0].log_user === 1
                ? "/accountRestricted"
                : "/staffRestricted"
            ); //navigate to restridted msg page
          }
        } else {
          setOtpError(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      checklogin();
    }
  }, [otp]);

  useEffect(() => {
    
      const interval = setInterval(() => {
        
        setSeconds(seconds - 1);
        if (seconds === 0) {
          clearInterval(interval);
        }
      
      }, 1000);
  return () => clearInterval(interval);

  }, [fetchOtp]);

  return (
    <motion.div className="bg-no-repeat bg-cover bg-center relative front">
      <div className="absolute bg-gradient-to-r from-blue-600/10 to-blue-600/10 inset-0 z-0"></div>
      <div className="min-h-screen flex flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 max-w-5xl xl:max-w-2xl z-10">
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
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={otpdrop}
                />
                <p>{cotp !== 0 ? cotp : "" }</p>
              </div>
              
              {otpdrop ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    OTP
                  </label>
                  <motion.input
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    type=""
                    placeholder="Enter your otp..."
                    whileTap={{ scale: 0.97 }}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  {seconds > 0 ? (
                    <p>
                      Time Remaining: {seconds}
                    </p>
                  ) : (
                    <p>Didn't recieve code?</p>
                  )}
                  <span>{otpError ? "Login Failed" : ""}</span>
                </div>
              ) : (
                <div></div>
              )}
              {console.log(seconds)}
              <div>
                <motion.button
                  className={seconds === 0 ? "w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition" : "w-full flex justify-center bg-slate-400 hover:bg-slate-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition"}
                  whileTap={{ scale: 0.9 }}
                  onClick={fetchOtp}
                >
                  {otpmsg}
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

export default Login;
